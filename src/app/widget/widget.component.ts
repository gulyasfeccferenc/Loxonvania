import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {UnitService} from '../unit.service';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass']
})
export class WidgetComponent implements OnInit, OnDestroy {
  subscribe: Subscription;

  constructor(private userService: UserService, private unitService: UnitService) { }

  ngOnInit() {
    const source = timer(1000, 1000);
    this.subscribe = source.subscribe(val => {
      this.userService.addPoint(this.unitService.getAllUnitPoint());
    });
    this.unitService.generateUnit();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
