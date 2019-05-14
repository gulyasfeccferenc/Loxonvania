import {WorkerComponent} from './models/worker/worker.component';

export class UnitService {
  units = [
    new WorkerComponent( 'Milán',  10),
    new WorkerComponent(  'Milcsi',  100),
    new WorkerComponent('Milos',  250),
    new WorkerComponent( 'Oidipus Milos', 1000)
  ];

  addUnit(name: string, produce: number) {
    this.units.push(new WorkerComponent(name, produce));
  }
}
