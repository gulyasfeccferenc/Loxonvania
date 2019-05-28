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
    if (this.authService.isAuthenticated()) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user != null && this.user.getUserData() == null) {
        this.user.setUserData(user);
      }
    }
    const color = localStorage.getItem('background-color');
    if (color != null) {
      document.querySelector('body').className = color;
    }
  }

  constructor(private authService: AuthService, private user: UserService) {

  }
}
