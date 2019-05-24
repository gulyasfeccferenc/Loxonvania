import {WorkerModel} from './models/worker/worker.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from './models/auth/user.model';
import {Level} from './models/level/level.model';
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
  private userUpdated = new Subject<User>();
  pointsUpdated$ = new BehaviorSubject<number>(this.user.points);
  private unitsUpdated: Subscription;

  constructor(private httpClient: HttpClient, private unitService: UnitService) {
    this.production = unitService.getAllUnitPoint();
    this.unitsUpdated = this.unitService.getUnitsUpdatedListener()
      .subscribe((units: WorkerModel[]) => {
        console.warn('UNIT PONTOK::::', this.unitService.getAllUnitPoint());
        this.production = this.unitService.getAllUnitPoint();
      });
  };

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

  getUserPoints(): number {
    // console.log('Összesen: ', this.user.points);
    return this.user.points;
  }

  getCalculatedWidth(): number {
    return 50; //TODO: GET THE CALCULATED WITH
  }

  getUserUpdatedListener() {
    return this.userUpdated.asObservable();
  }

  addPoint(point: number) {
    if (point == null) {
      // console.error(this.unitService.getAllUnitPoint());
      // point = this.unitService.getAllUnitPoint();
    }
    // console.error(point);
    this.user.points += this.production;
    // console.log('Addpoint:', this.production);
    this.userUpdated.next(this.user);
  }
}
