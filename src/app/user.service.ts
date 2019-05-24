import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from './models/auth/user.model';
import {UnitService} from './unit.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User = {
    name: 'Fecc',
    points: 1000,
    company: 'Loxonvania',
    level: []
  };
  private production: number;
  private userUpdated = new BehaviorSubject<User>(this.user);

  constructor(private httpClient: HttpClient, private unitService: UnitService) { };

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

  /**
   * Utility function calculate width of widget's progress bar regarding of remaining points
   */
  getCalculatedWidth(): number {
    return 50; //TODO: GET THE CALCULATED WITH
  }

  getUserUpdatedListener() {
    return this.userUpdated.asObservable();
  }

  /**
   * Function to trigger next iteration of giving points
   */
  recalculatePoint() {
    this.user.points += this.production;
    this.userUpdated.next(this.user);
  }

  setProduction(production: number) {
    this.production = production;
    this.userUpdated.next(this.user);
  }


}
