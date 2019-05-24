import {Component, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../unit.service';
import {WorkerModel} from '../models/worker/worker.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass'],
  providers: [UnitService]
})
export class WorkplaceComponent implements OnInit, OnDestroy {
  units: WorkerModel[] = [];
  private unitsSubscription: Subscription;

  constructor(private unitService: UnitService, private userService: UserService) {
    unitService.getUnits();
    this.unitsSubscription = this.unitService.getUnitsUpdatedListener()
      .subscribe((units: WorkerModel[]) => {
        this.units = units;
      });
  }

  ngOnInit() {
    // const element = document.getElementById('app-workplace-omniscroll');
    // const vat = Scrollbar.init(element, {}); //TODO: Add smooth scrolling after everything else finished
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

  getNewUnit() {
    this.unitService.generateUnit();
  }

  newUnitAvailable() {
    return this.userService.getUserData().points > 1050;
  }

}
