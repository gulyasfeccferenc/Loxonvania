import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private units: WorkerModel[] = [];
  private unitsUpdated = new Subject<WorkerModel[]>();

  constructor(private httpClient: HttpClient) { };

  addUnit(name: string, produce: number) {
    // this.units.push({name, produce});
  }

  getUnits() {
    this.httpClient
      .get<{message: string, units: WorkerModel[]}>('http://localhost:3000/api/units')
      .subscribe(
        postData => {
          this.units = postData.units;
          this.unitsUpdated.next(this.units.slice());
        });
  }

  getUnitsUpdatedListener() {
    return this.unitsUpdated.asObservable();
  }
}
