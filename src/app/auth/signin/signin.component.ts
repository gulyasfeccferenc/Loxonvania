import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';
import {TokenService} from '../token.service';
import {Router} from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../../shared.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  alerts = [];

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private httpClient: HttpClient,
              private shared: SharedService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.clearAuthError();
    this.authService.authenticate(email, password).subscribe((e) => {
      console.log(this.authService.getLoggedInUserName());
      console.log(this.tokenService.getUserName());
      console.log(this.tokenService.getEverything());

      this.httpClient
        .post<{message: string, user}>('http://localhost:3000/api/login', {email})
        .pipe(map((userData) => {
          console.error(userData);
          return {
            id: userData.user._id,
            points: userData.user.point,
            level: userData.user.level,
            xp: userData.user.xp,
            avatar: userData.user.avatar
          };
        }))
        .subscribe(
        (next) => {
          this.shared.userId = next.id;
          console.log(this.shared.userId);
          this.router.navigateByUrl('/workplace');
        }
      );
    }, (e) => {
      console.log('Signin error:', e);
      this.handleAuthError(e.error.error_description.toLowerCase());
    });
  }

  handleAuthError(msg) {
    console.warn(msg);
    if (msg.includes('username')) {
      document.getElementById('email').classList.add('is-invalid');
    } else if (msg.includes('password')) {
      document.getElementById('password').classList.add('is-invalid');
    } else if (msg.includes('credentials')) {
      document.getElementById('email').classList.add('is-invalid');
      document.getElementById('password').classList.add('is-invalid');
    }
    this.alerts.push({type: 'danger', message: msg});
  }

  clearAuthError() {
    this.alerts = [];
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('password').classList.remove('is-invalid');
  }

  close(alert: NgbAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
