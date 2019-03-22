import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.sass']
})
export class WorkerComponent implements OnInit {
  name: string;
  produce: number;

  constructor() { }

  ngOnInit() {
  }
}
