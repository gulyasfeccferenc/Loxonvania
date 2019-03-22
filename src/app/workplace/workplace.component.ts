import { Component, OnInit } from '@angular/core';
import { WorkerComponent } from '../models/worker';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass']
})
export class WorkplaceComponent implements OnInit {
  units: WorkerComponent[] = [
    {name: 'Milán', produce: 10},
    {name: 'Milcsi', produce: 100},
    {name: 'Milos', produce: 250},
    {name: 'Oidipus Milos', produce: 1000}];

  constructor() { }

  ngOnInit() {
  }

}
