import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SharedService} from './shared.service';

@Injectable({ providedIn: 'root' })
export class UnitService {

  private units: WorkerModel[] = [];
  currentProduction = 0;
  currentProductionVar: Subject<number>;
  currentProduction$ = new BehaviorSubject<number>(this.currentProduction);
  private unitsUpdated = new BehaviorSubject<WorkerModel[]>(this.units);
  private broadcastProduction: Observable<number>;

  getUnitsUpdatedValue() {
    this.unitsUpdated.getValue();
  }

  getProductionBroadcast() {
    return this.currentProduction$.asObservable();
  }

  constructor(private httpClient: HttpClient, private shared: SharedService) {
    this.getUnits();
    this.currentProductionVar = this.shared._produceValue;
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
      .get<{message: string, unit: WorkerModel}>('http://localhost:3000/api/units/generate')
      .subscribe(
        postData => {
          this.addUnit(postData.unit);
          this.currentProduction += postData.unit.produce;
          this.shared.changeProduceValue(this.currentProduction);
          this.unitsUpdated.next(this.units.slice());
        });
  }

  /**
   * Get all units of the current user
   */
  getUnits() {
    this.httpClient
      .get<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/units/list')
      .subscribe(
        postData => {
          this.units = postData.units;
          this.currentProduction = this.calcAllUnitPoint(postData.units);
          this.shared.changeProduceValue(this.currentProduction);
          this.unitsUpdated.next(this.units.slice());
        });
  }

  calcAllUnitPoint(units: WorkerModel[]) {
    this.currentProduction = 0;
    units.forEach( v => {
      this.currentProduction += v.produce;
    });
    return this.currentProduction;
  }

  getUnitList() {
    return this.units.slice();
  }

  getUnitsUpdatedListener() {
    return this.unitsUpdated.asObservable();
  }

  liftUnitLevel(unit: WorkerModel) {
    const nr = this.units.indexOf(unit);
    if (nr != null && nr > 0) {
      this.units[nr].level++;
      // TODO: Backend update
      this.unitsUpdated.next(this.units);
    }
  }

  fireUnit(unit: WorkerModel) {
    // Remove production value
    this.currentProduction -= unit.produce;
    this.shared.changeProduceValue(this.currentProduction);

    // Delete on the frontend, then send request to backend
    this.units.splice(this.units.indexOf(unit), 1);

    // TODO: Backend destroy
    this.unitsUpdated.next(this.units.slice());
  }
}
