import { Component, OnInit } from '@angular/core';
import { AchievmentComponent } from '../models/achievment/achievment.component';
import { LevelComponent } from '../models/level/level.component';
import {AchievmentService} from '../achievment.service';

@Component({
  selector: 'app-achievments',
  templateUrl: './achievments.component.html',
  styleUrls: ['./achievments.component.sass'],
  providers: [AchievmentService]
})
export class AchievmentsComponent implements OnInit {
  levels: LevelComponent[] = [];
  achievments: AchievmentComponent[] = [];

  constructor(private achievmentService: AchievmentService) {
    this.levels = achievmentService.levels;
    this.achievments = achievmentService.achievments;
  }

  ngOnInit() {
  }

}
