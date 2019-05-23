import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private units: WorkerModel[] = [];
  private currentProduction = 0;
  private unitsUpdated = new Subject<WorkerModel[]>();

  constructor(private httpClient: HttpClient) {
    this.getUnits();
    this.getAllUnitPoint();
  }

  addUnit(name: string, produce: number) {
    // this.units.push({name, produce});
  }

  generateUnit() {
    const newUnit: WorkerModel = {
      active: true,
      description: 'Strongest new BC of the Universe',
      id: 'lol01',
      joined: null,
      level: 5,
      name: 'Géza',
      produce: 3,
      sprite: '',
      type: 1
    };
    this.units.push(newUnit);
    this.callUnitsUpdated();
  }

  /**
   * Get all units of the current user
   */
  getUnits() {
    this.httpClient
      .get<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/units')
      .subscribe(
        postData => {
          this.units = postData.units;
          this.callUnitsUpdated();
        });
  }

  callUnitsUpdated() {
    // console.error(this.unitsUpdated);
    this.unitsUpdated.next(this.units.slice());
  }

  /**
   * On every try it will iterate though all available unit and sum their current production value.
   */
  getAllUnitPoint() {
    this.currentProduction = 0;
    this.units.forEach( v => {
      this.currentProduction += v.produce;
    });
    console.warn('UNITOKAT GENERÁLOK');
    this.generateUnit();
    return this.currentProduction;
  }

  getUnitsUpdatedListener() {
    return this.unitsUpdated.asObservable();
  }
}
