import {Achievment} from '../achievment/achievment.model';

export interface Level {
  id: number;
  rank: number;
  name: string;
  achievments: Achievment[];
}
