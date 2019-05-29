import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {UnitService} from '../unit.service';
import {User} from '../models/auth/user.model';
import {SharedService} from '../shared.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass']
})
export class WidgetComponent implements OnInit, OnDestroy {
  private points = 0; // To keep track current point of the User
  private produce = 0; // Point production of every minute
  private xp = 0; // User's sum of experience
  private xpProduction = 0; // XP production of every minute
  everySecond: Observable<number> = timer(0, 1000 * 30);
  private subscription: Subscription;
  private pointSubscription;
  private produceSubscription: Subject<number>;
  private xpSubscription: Subject<number>;

  constructor(private userService: UserService, private unitService: UnitService, private shared: SharedService, private httpClient: HttpClient) {
    // This timer will trigger point/xp recalculation on each tick
    this.subscription = this.everySecond.subscribe((seconds) => {
      if (seconds > 0) {
        this.userService.recalculatePoint();
        this.syncDataWithServer();
      }
    });

    // Subscribe for the shared variable containing current production
    this.produceSubscription = this.shared.produceValue;
    this.produceSubscription.subscribe( value => {
      this.produce = value;
      this.userService.setProduction(this.produce);
    });
    // Calculating and resetting xp value in shared comp.
    this.xpSubscription = this.shared.xpValue;
    this.xpSubscription.subscribe( value => {
      this.xpProduction = value;
      this.userService.setXpProduction(this.xpProduction);
    });
  }

  ngOnInit() {
    this.pointSubscription = this.userService
      .getUserUpdatedListener()
      .subscribe((user: User) => {
        if (user != null) {
          this.points = user.points;
          this.xp = user.xp;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pointSubscription.unsubscribe();
    this.syncDataWithServer();
  }

  syncDataWithServer() {
    this.httpClient
      .post('http://localhost:3000/api/user/update',
        {
          id: this.userService.getUserData().id,
          points: this.userService.getUserData().points,
          xp: this.userService.getUserData().xp
        })
      .subscribe( value => {
        console.warn('Sync done!', value);
        this.userService.queryUserData(this.userService.getUserData().name);
      }, error1 => {
        console.error('Error while syncing: ', error1);
      });
  }
}
