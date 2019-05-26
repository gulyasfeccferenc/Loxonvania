import {Component, OnDestroy, OnInit} from '@angular/core';
import {AchievmentService} from '../achievment.service';
import {Level} from '../models/level/level.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-achievments',
  templateUrl: './achievments.component.html',
  styleUrls: ['./achievments.component.sass'],
  providers: [AchievmentService]
})
export class AchievmentsComponent implements OnInit, OnDestroy {
  levels: Level[] = [];
  private levelsSubscription: Subscription;

  constructor(private achievmentService: AchievmentService) {
    achievmentService.getLevels();
    this.levelsSubscription = this.achievmentService
      .getAchievmentsUpdatedListener()
      .subscribe( (levels: Level[]) => {
        this.levels = levels;
    });
    // this.levels = achievmentService.getLevels();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.levelsSubscription.unsubscribe();
  }

}