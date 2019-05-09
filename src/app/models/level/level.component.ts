import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.sass']
})
export class LevelComponent implements OnInit {
  rank: number;
  name: string;

  constructor(rank: number, name: string) {
    this.rank = rank;
    this.name = name;
  }

  ngOnInit() {
  }

}
