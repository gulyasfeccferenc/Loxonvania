import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  _produceValue: Subject<number> = new Subject();

  get produceValue(): Subject<number> {
    return this._produceValue;
  }

  set produceValue(src: Subject<number>) {
    this._produceValue = src;
  }

  constructor() { }

  changeProduceValue(n: number) {
    this._produceValue.next(n);
  }
}
