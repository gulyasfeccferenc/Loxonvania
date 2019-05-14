import {AchievmentComponent} from './models/achievment/achievment.component';
import {LevelComponent} from './models/level/level.component';


export class AchievmentService {
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

  addAchievment(name: string, description: string, level: number) {
    this.achievments.push(new AchievmentComponent(name, description, level));
  }
}
