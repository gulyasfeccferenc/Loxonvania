import {WorkerModel} from './models/worker/worker.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {post} from 'selenium-webdriver/http';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UnitService {

  private units: WorkerModel[] = [];
  currentProduction = 0; // All units producing potential
  currentProductionVar: Subject<number>;
  currentXpGathering = 0; // How many xp the units producing
  currentXpGatheringVar: Subject<number>; // Subject to keep track of the shared variable
  private unitsUpdated = new BehaviorSubject<WorkerModel[]>(this.units);

  constructor(private httpClient: HttpClient, private shared: SharedService) {
    this.getUnits();
    this.currentProductionVar = this.shared._produceValue;
    this.currentXpGatheringVar = this.shared._xpValue;
  }

  // getCurrentProduction() {
  //   this.currentProduction$.next(this.currentProduction);
  //   console.log(this.currentProduction$.getValue());
  //   return this.currentProduction$.getValue();
  // }

  addUnit(worker: WorkerModel) {
    this.units.push(worker);
  }

  generateUnit() {
    this.httpClient
      .post<{message: string, unit: WorkerModel}>('http://localhost:3000/api/units/generate', { id: this.shared.userId }, {})
      .subscribe(
        postData => {
          console.log(":::GETTING NEW UNIT");
          console.log(postData);
          this.addUnit(postData.unit);

          this.currentProduction += postData.unit.produce;
          this.shared.changeProduceValue(this.currentProduction);

          this.currentXpGathering += postData.unit.xp;
          this.shared.changeXP(this.currentXpGathering);

          this.unitsUpdated.next(this.units.slice());
        }, error1 => {
          console.error("ERROR OF THE GENERATE UNIT");
          console.error(error1);
        });
  }

  /**
   * Get all units of the current user
   */
  getUnits() {
    // console.warn(this.shared.userId);
    let uID = this.shared.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    };

    if (!uID || uID == null) {
      let sharedUser = JSON.parse(localStorage.getItem('user'));
      if (sharedUser) {
        uID = sharedUser.id;
      }
    }

    this.httpClient
      .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/units/list', {  id: uID })
      // .pipe(map( unitData => {
      //   @ts-ignore
        // const unit = unitData;
        // console.warn(":::::::::::::SINGLE UNIT MAPPING");
        // console.warn(unit);
        // return {
        //   id: unit._id,
        //   name: unit.name,
        //   sprite: unit.sprite,
        //   description: unit.description,
        //   joined: unit.joined,
        //   active: unit.active,
        //   level: unit.level,
        //   type: unit.type,
        //   produce: unit.produce,
        //   xp: unit.xp
        // };
      // }))
      // .pipe(map((userData) => {
      //   @ts-ignore
        // const user = userData.user;
        // console.error(":::::USER QUERIED");
        // console.error(user);
        // return {
        //   id: user._id,
        //   points: user.point,
        //   level: user.level,
        //   xp: user.xp,
        //   avatar: user.avatar,
        //   name: user.name,
        //   company: user.company,
        //   email: user.email
        // };
      // }))
      .subscribe(
        postData => {
          this.units = postData.units;
          this.calcAllUnitPoint(postData.units);
          this.shared.changeProduceValue(this.currentProduction);
          this.shared.changeXP(this.currentXpGathering);

          this.unitsUpdated.next(this.units.slice());
        }, (error1) => {
          console.error("NOOOOOO");
          console.error(error1);
        });
  }

  getNrOfUnits(): number {
    return this.units.length || 0;
  }

  calcAllUnitPoint(units: WorkerModel[]) {
    this.currentProduction = 0;
    this.currentXpGathering = 0;
    units.forEach( v => {
      this.currentProduction += v.produce;
      this.currentXpGathering += v.xp;
    });
  }

  getUnitsUpdatedListener() {
    return this.unitsUpdated.asObservable();
  }

  liftUnitLevel(unit: WorkerModel, unitId: string, userId: string) {
    const nr = this.units.indexOf(unit);
    if (nr != null) {
      this.units[nr].level++;
      // TODO: Backend update
      this.httpClient
        .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/unit/lift', { id: this.shared.userId, unitId: unitId, newLevel: unit.level })
        .subscribe(
          postData => {
            console.error(postData);
          });
      this.unitsUpdated.next(this.units.slice());
    }
  }

  fireUnit(unit: WorkerModel, unitId: string, userId: string) {
    // Remove production value
    this.currentProduction -= unit.produce;
    this.shared.changeProduceValue(this.currentProduction);

    // Delete on the frontend, then send request to backend
    this.units.splice(this.units.indexOf(unit), 1);

    // TODO: Backend destroy
    console.warn("::::::FIRING UNIT");
    console.warn(unit.id);
    console.warn(this.shared.userId);
    this.httpClient
      .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/unit/fire', { id: userId, unitId: unitId })
      .subscribe(
        postData => {
          console.error(postData);
        });
    this.unitsUpdated.next(this.units.slice());
  }
}
