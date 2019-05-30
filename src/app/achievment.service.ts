import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Level} from './models/level/level.model';

@Injectable({ providedIn: 'root' })
export class AchievmentService {
  levels: Level[] = [];
  private achievmentsUpdated = new Subject<Level[]>();

  constructor(private httpClient: HttpClient) { };

  addAchievment(userId: string, achievmentId: string) {
    // this.achievments.push(new AchievmentComponent(name, description, level));
    this.httpClient
      .post<{message: string, levels: Level[]}>('http://localhost:3000/api/achievment/buy', {id: userId, achiid: achievmentId})
      .subscribe(v => {
        console.log('Achievement átvétele:', v);
        this.levels = v.levels;
      });
  }

  getLevels(userId: string) {
    this.levels.slice();

    this.httpClient
      .post<{message: string, levels: Level[]}>('http://localhost:3000/api/achievments', {id: userId})
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
