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
    new LevelComponent(1, 'Kezdő'),
    new LevelComponent(2, 'Haladó'),
    new LevelComponent(3, 'Profi'),
    new LevelComponent(4, 'Kiülőmester')
  ];
  achievments: AchievmentComponent[] = [
    new AchievmentComponent('Pontduplázó', 'x2', 3),
    new AchievmentComponent('Max termelékenység', '+123', 3),
    new AchievmentComponent('$$$ PROFIT', '$$$', 3)
  ];

  constructor() { }

  ngOnInit() {
  }

}
