import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievment',
  templateUrl: './achievment.component.html',
  styleUrls: ['./achievment.component.sass']
})
export class AchievmentComponent implements OnInit {
  id: number;
  name: string;
  desc: string;
  level: number;
  visible: boolean;
  options: string;


  constructor(name: string, desc: string, level: number) {
    this.name = name;
    this.desc = desc;
    this.level = level;
  }

  ngOnInit() {
  }

}
