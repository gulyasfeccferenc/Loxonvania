import {Component, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../unit.service';
import {WorkerModel} from '../models/worker/worker.model';
import {Subscription} from 'rxjs';

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
    this.unitsSubscription = this.unitService.getUnitsUpdatedListener()
      .subscribe((units: WorkerModel[]) => {
        this.units = units;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

}
