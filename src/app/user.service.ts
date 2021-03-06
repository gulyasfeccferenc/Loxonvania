import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from './models/auth/user.model';
import {UnitService} from './unit.service';
import {SharedService} from './shared.service';
import {map} from 'rxjs/operators';

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
        // @ts-ignore
        const user = userData.user;
        return {
          id: user._id,
          points: user.point,
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
    if (!this.production || this.production == null) {
      this.production = 1;
    }
    if (!this.xpProduction || this.xpProduction == null) {
      this.xpProduction = 0;
    }
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
