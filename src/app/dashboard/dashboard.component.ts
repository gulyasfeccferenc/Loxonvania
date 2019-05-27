import { Component, OnInit } from '@angular/core';
import {User} from '../models/auth/user.model';
import {Level} from '../models/level/level.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  leaders = [
    {name: 'Tuk Peregrin', level: 100, points: 1000, company: 'Répa & Co'},
    {name: 'Csavardi Samu', level: 100, points: 1000, company: 'Csűrös és Társa'},
    {name: 'Borbak Trufa', level: 100, points: 1000, company: 'Csülök Bt'}
  ];
  slides = [
    {src: '/assets/tutorial_01.jpg'}
  ]

  constructor() { }

  ngOnInit() {

  }

}
