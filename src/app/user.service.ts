import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from './models/auth/user.model';
import {UnitService} from './unit.service';
import {SharedService} from './shared.service';
import {map} from 'rxjs/operators';
import {Level} from './models/level/level.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User;
  private production: number;
  private xpProduction: number;
  private userUpdated = new BehaviorSubject<User>(this.user);

  constructor(private httpClient: HttpClient, private unitService: UnitService, private shared: SharedService) { }

  queryUserData(email: string) {
    this.httpClient
      .post<{message: string, userData}>('http://localhost:3000/api/user', { email: email != null ? email : this.user.email })
      .pipe(map((userData) => {
        console.error("query user data");
        // @ts-ignore
        const user = userData.user;
        console.error(user);
        return {
          id: user._id,
          points: user.points,
          level: user.level,
          xp: user.xp,
          avatar: user.avatar,
          name: user.name,
          company: user.company,
          email: user.email
        };
      }))
      .subscribe(
        transfUserData => {
          this.user = transfUserData;
          this.shared.userId = this.user.id;
          localStorage.setItem('user', JSON.stringify(this.user));
        });
  }

  setUserData(user: User) {
    this.user = user;
  }

  getUserData(): User {
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

  setUserEmail(username: string) {
    this.user.email = username;
  }
}
