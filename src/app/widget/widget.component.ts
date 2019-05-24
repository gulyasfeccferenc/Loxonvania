import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {UnitService} from '../unit.service';
import {User} from '../models/auth/user.model';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass']
})
export class WidgetComponent implements OnInit, OnDestroy {
  private points = 0;
  private produce = 0;
  everySecond: Observable<number> = timer(0, 1000);
  private subscription: Subscription;
  private pointSubscription;
  private produceSubscription: Subject<number>;

  constructor(private userService: UserService, private unitService: UnitService, private shared: SharedService) {
    // This timer will trigger point/xp recalculation on each tick
    this.subscription = this.everySecond.subscribe((seconds) => {
      if (seconds > 0) {
        this.userService.recalculatePoint();
      }
    });

    // Subscribe for the shared variable containing current production
    this.produceSubscription = this.shared.produceValue;
    this.produceSubscription.subscribe( value => {
      this.produce = value;
      this.userService.setProduction(this.produce);
    });
  }

  ngOnInit() {
    this.pointSubscription = this.userService
      .getUserUpdatedListener()
      .subscribe((user: User) => {
        this.points = user.points;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pointSubscription.unsubscribe();
  }
}
