import {Level} from '../level/level.model';

export interface User {
  name: string;
  company: string;
  points: number;
  xp: number;
  level: Level[];
}
