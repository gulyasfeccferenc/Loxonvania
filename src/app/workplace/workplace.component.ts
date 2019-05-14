import { Component, OnInit } from '@angular/core';
import { WorkerComponent } from '../models/worker/worker.component';
import {UnitService} from '../unit.service';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass'],
  providers: [UnitService]
})
export class WorkplaceComponent implements OnInit {
  units: WorkerComponent[] = [];

  constructor(private unitService: UnitService) {
    this.units = unitService.units;
  }

  ngOnInit() {
  }

}
