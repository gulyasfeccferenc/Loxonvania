import { Injectable } from '@angular/core';
import {UnitService} from '../unit.service';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private unitService: UnitService, private userService: UserService) { }

  getProduceValue(): number {
    console.log(this.unitService.getAllUnitPoint());
    console.log(this.unitService.getUnits());
    console.log(this.userService.getUserPoints());
    console.log(this.userService.getUserData());
    return this.unitService.getAllUnitPoint();
  }
}
