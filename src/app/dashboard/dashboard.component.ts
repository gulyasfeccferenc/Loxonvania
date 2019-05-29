import { Component, OnInit } from '@angular/core';
import {User} from '../models/auth/user.model';
import {Level} from '../models/level/level.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  origiLeaders = [
    {name: 'Tuk Peregrin', level: 100, point: 1000, company: 'Répa & Co'},
    {name: 'Csavardi Samu', level: 100, point: 1000, company: 'Csűrös és Társa'},
    {name: 'Borbak Trufa', level: 100, point: 1000, company: 'Csülök Bt'}
  ];
  slides = [
    {src: '/assets/tutorial_01.jpg'},
    {src: '/assets/tutorial_02.jpg'},
    {src: '/assets/tutorial_03.jpg'}
  ];
  leaders = this.origiLeaders;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient
      .get<{message: string,
        leaders: [{name: string, level: number, point: number, company: string}]}>
      ('http://localhost:3000/api/user/top10')
      .subscribe((values) => {
        this.leaders = values.leaders;
      }, (error1 => {
        console.error('An error happened while fetching besties');
      }));
  }

}
