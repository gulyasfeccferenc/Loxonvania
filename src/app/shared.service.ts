import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  _produceValue: Subject<number> = new Subject();
  _xpValue: Subject<number> = new Subject();

  /** GETTERS & SETTERS */
  get produceValue(): Subject<number> {
    return this._produceValue;
  }
  set produceValue(src: Subject<number>) {
    this._produceValue = src;
  }
  get xpValue(): Subject<number> {
    return this._xpValue;
  }
  set xpValue(src: Subject<number>) {
    this._xpValue = src;
  }

  constructor() { }

  /**
   * Change the current value of the user's produce variable
   * @param n - number
   */
  changeProduceValue(n: number) {
    this._produceValue.next(n);
  }

  /**
   * Change the XP production of the user
   * @param n - number
   */
  changeXP(n: number) {
    this._xpValue.next(n);
  }

}
