import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Level} from './models/level/level.model';

@Injectable({ providedIn: 'root' })
export class AchievmentService {
  levels: Level[] = [];
  private achievmentsUpdated = new Subject<Level[]>();

  constructor(private httpClient: HttpClient) { };

  addAchievment(name: string, description: string, level: number) {
    // this.achievments.push(new AchievmentComponent(name, description, level));
  }

  getLevels() {
    this.levels.slice();
    this.httpClient
      .get<{message: string, levels: Level[]}>('http://localhost:3000/api/achievments')
      .subscribe(
        postData => {
          this.levels = postData.levels;
          this.achievmentsUpdated.next(this.levels.slice());
        });
  }

  getAchievmentsUpdatedListener() {
    return this.achievmentsUpdated.asObservable();
  }
}
