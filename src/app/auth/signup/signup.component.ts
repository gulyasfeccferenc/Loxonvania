import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../../models/auth/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  company = 'my company';
  alerts: NgbAlert[] = [];

  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const companyName = form.value.company;
    const registration: User = {name: email, company: companyName, level: [], points: 0, xp: 30 };
    this.clearAuthError();

    this.authService.authenticate(email, password).subscribe(() => {
      console.log(registration);
      this.httpClient
        .post<{message: string}>('http://localhost:3000/api/register', registration, {headers: {'Content-Type': 'application/json' } })
        .subscribe(postData => {
          console.log(postData);
          this.router.navigateByUrl('/workplace');
        }, error => {
          if (error.error != null && error.error.message != null) {
            this.handleAuthError(error.error.message.toLowerCase());
          } else {
            this.alerts.push({type: 'danger', message: error.message.toString() });
            console.error('HIBA TÖRTÉNT:', error);
          }
        });
      console.log('Message sent?');
    },
    e => {
      console.log('Registration error:', e);
      this.handleAuthError(e.error.error_description.toLowerCase());
    });
  }

  companyNameRefreshed(f) {
    this.company = f;
    if (this.company.length === 0) {
      this.company = 'my company';
    }
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
    } else if (msg.includes('company')) {
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
