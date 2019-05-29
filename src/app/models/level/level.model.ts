import {Achievment} from '../achievment/achievment.model';

export interface Level {
  id: string;
  rank: number;
  name: string;
  achievments: Achievment[];
}
