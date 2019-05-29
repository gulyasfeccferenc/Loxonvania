import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../../models/auth/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  company = 'my company';
  alerts = [];

  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const companyName = form.value.company;
    let registration: User = {id: null, name: null, email: email, company: companyName, level: [], points: 0, xp: 30 };
    this.clearAuthError();


    this.authService
      .authenticate(email, password)
      .subscribe((userData) => {
        console.log(registration);
        console.log(userData);
        const userName = this.authService.getLoggedInUserName();
        console.warn(userName);
        registration.name = userName;
        // this.router.navigateByUrl('/workplace');

        this.httpClient
          .post<{message: string}>('http://localhost:3000/api/register', registration, {headers: {'Content-Type': 'application/json' } })
          .subscribe(postData => {
                  console.log(postData);
                  this.router.navigateByUrl('/workplace');
                }, (error) => {
                    if (error.error != null && error.error.error != null &&  error.error.error.message != null) {
                      this.handleAuthError(error.error.error.message);
                    } else {
                      this.alerts.push({type: 'danger', message: error.message.toString()});
                      console.error('HIBA TÖRTÉNT:', error);
                    }
            });
      }, (error) => {
        console.error(error);
        this.alerts.push({type: 'danger', message: error.message.toString()});
        this.authService.logout();
      }
    );
  }

  companyNameRefreshed(f) {
    this.company = f;
    if (this.company.length === 0) {
      this.company = 'my company';
    }
  }

  handleAuthError(msg) {
    const lwMsg = msg.toLowerCase();
    if (lwMsg.includes('username')) {
      document.getElementById('email').classList.add('is-invalid');
    } else if (lwMsg.includes('password')) {
      document.getElementById('password').classList.add('is-invalid');
    } else if (lwMsg.includes('credentials')) {
      document.getElementById('email').classList.add('is-invalid');
      document.getElementById('password').classList.add('is-invalid');
    } else if (lwMsg.includes('company')) {
      document.getElementById('company').classList.add('is-invalid');
    }
    this.alerts.push({type: 'danger', message: msg});
  }

  clearAuthError() {
    this.alerts = [];
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('password').classList.remove('is-invalid');
    document.getElementById('company').classList.remove('is-invalid');
  }

  close(alert: NgbAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
