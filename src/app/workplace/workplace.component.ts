import {Component, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../unit.service';
import {WorkerModel} from '../models/worker/worker.model';
import {Subscription} from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass'],
  providers: [UnitService]
})
export class WorkplaceComponent implements OnInit, OnDestroy {
  units: WorkerModel[] = [];
  private unitsSubscription: Subscription;

  constructor(private unitService: UnitService) {
    unitService.getUnits();
  }

  ngOnInit() {
    this.unitsSubscription = this.unitService.getUnitsUpdatedListener()
      .subscribe((units: WorkerModel[]) => {
        console.log('Ezek az elemeim: ', units);
        this.units = units;
      }, (anyz) => {
        console.error(anyz);
      }, () => {
        console.error('Off');
      });

    const source = timer(1000, 1000);
    const subscribe = source.subscribe(val => {
      console.error(this.unitsSubscription);
    });
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

}
