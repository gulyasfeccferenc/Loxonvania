import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {UnitService} from '../unit.service';
import {subscribeOn} from 'rxjs/operators';
import {User} from '../models/auth/user.model';
import {WorkerModel} from '../models/worker/worker.model';
import {WidgetService} from './widget.service';

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
  private unitSubscription: Subscription;
  private pointSubscription;

  constructor(private userService: UserService, private unitService: UnitService, private widgetService: WidgetService ) {
    this.subscription = this.everySecond.subscribe((seconds) => {
      if (seconds > 0) {
        this.callServices(seconds);
      }
    });
  }

  ngOnInit() {
    this.pointSubscription = this.userService
      .getUserUpdatedListener()
      .subscribe((user: User) => {
        this.points = user.points;
      });
    this.unitSubscription = this.unitService
      .getUnitsUpdatedListener()
      .subscribe((units: any) => {
        // console.warn('Az egységek végre:');
        console.warn(units);
      });
  }

  callServices(seconds) {
    let i = this.widgetService.getProduceValue();
    this.userService.addPoint(this.produce);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pointSubscription.unsubscribe();
    this.unitSubscription.unsubscribe();
  }

}
