import { Component, OnInit } from '@angular/core';
import { WorkerComponent } from '../models/worker/worker.component';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass']
})
export class WorkplaceComponent implements OnInit {
  units: WorkerComponent[] = [
    new WorkerComponent( 'Milán',  10),
    new WorkerComponent(  'Milcsi',  100),
    new WorkerComponent('Milos',  250),
    new WorkerComponent( 'Oidipus Milos', 1000)];

  constructor() { }

  ngOnInit() {
  }

}
