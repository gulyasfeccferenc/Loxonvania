import {Component, OnDestroy, OnInit} from '@angular/core';
import {AchievmentService} from '../achievment.service';
import {Level} from '../models/level/level.model';
import {Subscription} from 'rxjs';
import {SharedService} from '../shared.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-achievments',
  templateUrl: './achievments.component.html',
  styleUrls: ['./achievments.component.sass'],
  providers: [AchievmentService]
})
export class AchievmentsComponent implements OnInit, OnDestroy {
  levels: Level[] = [];
  private levelsSubscription: Subscription;

  constructor(private achievmentService: AchievmentService, private share: SharedService, private user: UserService) { }

  ngOnInit() {
    this.achievmentService.getLevels(this.share.userId);
    this.levelsSubscription = this.achievmentService
      .getAchievmentsUpdatedListener()
      .subscribe( (levels: Level[]) => {
        this.levels = levels;
      });
  }

  ngOnDestroy() {
    this.levelsSubscription.unsubscribe();
  }

}
