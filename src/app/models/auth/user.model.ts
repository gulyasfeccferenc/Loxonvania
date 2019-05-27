import {Level} from '../level/level.model';

export interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  points: number;
  xp: number;
  level: Level[];
}
