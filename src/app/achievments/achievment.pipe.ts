import { Pipe, PipeTransform } from '@angular/core';
import {Achievment} from '../models/achievment/achievment.model';

@Pipe({
  name: 'achievmentpipe',
  pure: false
})
export class AchievmentPipe implements PipeTransform {
  transform(items: Achievment[]): Achievment[] {
    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.visible);
  }
}
