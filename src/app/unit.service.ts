import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SharedService} from './shared.service';

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
      .post<{message: string, unit: WorkerModel}>('http://localhost:3000/api/units/generate', { id: this.shared.userId })
      .subscribe(
        postData => {
          this.addUnit(postData.unit);

          this.currentProduction += postData.unit.produce;
          this.shared.changeProduceValue(this.currentProduction);

          this.currentXpGathering += postData.unit.xp;
          this.shared.changeXP(this.currentXpGathering);

          this.unitsUpdated.next(this.units.slice());
        });
  }

  /**
   * Get all units of the current user
   */
  getUnits() {
    console.warn("Unit kérelem");
    console.warn(this.shared.userId);

    this.httpClient
      .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/units/list', { id: this.shared.userId })
      .subscribe(
        postData => {
          this.units = postData.units;
          console.warn("POSTDATA");
          console.warn(postData);
          this.calcAllUnitPoint(postData.units);
          this.shared.changeProduceValue(this.currentProduction);
          this.shared.changeXP(this.currentXpGathering);

          this.unitsUpdated.next(this.units.slice());
        }, error1 => {
          console.error("NOOOOOO");
          console.error(error1);
        });
  }

  getNrOfUnits(): number {
    return this.units.length;
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

  liftUnitLevel(unit: WorkerModel) {
    const nr = this.units.indexOf(unit);
    if (nr != null) {
      this.units[nr].level++;
      // TODO: Backend update
      this.httpClient
        .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/unit/lift', { id: this.shared.userId, unitId: unit.id })
        .subscribe(
          postData => {
            console.error(postData);
          });
      this.unitsUpdated.next(this.units.slice());
    }
  }

  fireUnit(unit: WorkerModel) {
    // Remove production value
    this.currentProduction -= unit.produce;
    this.shared.changeProduceValue(this.currentProduction);

    // Delete on the frontend, then send request to backend
    this.units.splice(this.units.indexOf(unit), 1);

    // TODO: Backend destroy
    this.httpClient
      .post<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/unit/fire', { id: this.shared.userId, unitId: unit.id })
      .subscribe(
        postData => {
          console.error(postData);
        });
    this.unitsUpdated.next(this.units.slice());
  }
}
