import {Level} from '../level/level.model';

export interface User {
  name: string;
  company: string;
  points: number;
  xp: 30;
  level: Level[];
}
