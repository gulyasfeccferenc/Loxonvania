import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from './models/auth/user.model';
import {Level} from './models/level/level.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User = {
    name: 'Fecc',
    points: 1000,
    company: 'Loxonvania',
    level: []
  };
  private unitsUpdated = new Subject<WorkerModel[]>();

  constructor(private httpClient: HttpClient) { };

  getUserData(): User {
    // this.httpClient
    //   .get<{message: string, userData: User}>('http://localhost:3000/api/user')
    //   .subscribe(
    //     userData => {
    //       this.user = userData;
          // console.log(userData);
          // this.unitsUpdated.next(this.units.slice());
        // });
    return this.user;
  }

  getCalculatedWidth(): number {
    return 50;
  }

  getUnitsUpdatedListener() {
    return this.unitsUpdated.asObservable();
  }

  addPoint(point: number) {
    this.user.points += point;
  }
}
