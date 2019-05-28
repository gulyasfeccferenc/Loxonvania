import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'Loxon Idle';

  ngOnInit(): void {
    const color = localStorage.getItem('background-color');
    if (color != null) {
      document.querySelector('body').className = color;
    }
  }

  constructor(private authService: AuthService, private user: UserService) {

  }
}
