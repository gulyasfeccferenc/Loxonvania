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
    points: 0,
    xp: 30,
    company: 'Loxonvania',
    level: []
  };
  private production: number;
  private xpProduction: number;
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
        // }); // HATALMAS TODO: Rendes user datát leszedni
    return this.user;
  }

  /**
   * Utility function calculate width of widget's progress bar regarding of remaining points
   */
  getCalculatedWidth(): number {
    const nextLevelBase = ((this.user.level.length + 1) * 1000);
    const currentLevelBase = ((this.user.level.length) * 1000);
    return ((this.user.xp - currentLevelBase) / nextLevelBase) * 100; //TODO: GET THE CALCULATED WITH
  }

  getUserUpdatedListener() {
    return this.userUpdated.asObservable();
  }

  spendPoints(price: number) {
    this.user.points -= price;
    this.userUpdated.next(this.user);
  }

  /**
   * Function to trigger next iteration of giving points
   */
  recalculatePoint() {
    this.user.points += this.production;
    this.user.xp += this.xpProduction;
    this.userUpdated.next(this.user);
  }

  setProduction(production: number) {
    this.production = production;
    this.userUpdated.next(this.user);
  }

  setXpProduction(xpProduction: number) {
    this.xpProduction = xpProduction;
    this.userUpdated.next(this.user);
  }

}
