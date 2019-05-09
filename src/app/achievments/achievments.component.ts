import { Component, OnInit } from '@angular/core';
import { AchievmentComponent } from '../models/achievment/achievment.component';
import { LevelComponent } from '../models/level/level.component';

@Component({
  selector: 'app-achievments',
  templateUrl: './achievments.component.html',
  styleUrls: ['./achievments.component.sass']
})
export class AchievmentsComponent implements OnInit {
  levels: LevelComponent[] = [
    new LevelComponent(1, 'Kezdő')
  ];
  achievments: AchievmentComponent[] = [
    new AchievmentComponent('asdf', '123', 3),
    new AchievmentComponent('asdf', '123', 3),
    new AchievmentComponent('asdf', '123', 3)
  ];

  constructor() { }

  ngOnInit() {
  }

}
