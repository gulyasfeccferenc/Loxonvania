import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnitService {

  private units: WorkerModel[] = [];
  private currentProduction = 0;
  private unitsUpdated = new Subject<WorkerModel[]>();



  constructor(private httpClient: HttpClient) {
    this.getUnits();
    // this.getAllUnitPoint();
    // const source = timer(1000, 1000);
    // source.subscribe(val => {
    //   console.log(this.getAllUnitPoint());
    //   this.userService.addPoint(this.getAllUnitPoint());
    // });

  }

  addUnit(worker: WorkerModel) {
    this.units.push(worker);
    // console.warn("Unite added:");
    // console.warn(this.units);
  }

  generateUnit() {
    this.httpClient
      .get<{message: string, unit: WorkerModel}>('http://localhost:3000/api/units/generate')
      .subscribe(
        postData => {
          this.addUnit(postData.unit);
          this.callUnitsUpdated();
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
          this.callUnitsUpdated();
        });
  }

  callUnitsUpdated() {
    // Itt még jó érték van a this.units.slice-ben a frissített értékekkel
    this.unitsUpdated.next(this.units.slice());
    // this.cd.markForCheck();
  }

  /**
   * On every try it will iterate though all available unit and sum their current production value.
   */
  getAllUnitPoint() {
    this.currentProduction = 0;
    this.getUnitList().forEach( v => {
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
}
