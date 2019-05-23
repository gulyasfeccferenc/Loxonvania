import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../../models/auth/user.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  company = 'my company';

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const companyName = form.value.company;
    const registration: User = {name: email, company: companyName, level: [], points: 0 };
    this.authService.authenticate(email, password).subscribe(() => {
      console.log(registration);
      this.httpClient
        .post<{message: string}>('http://localhost:3000/api/register', registration, {headers: {'Content-Type': 'application/json' } })
        .subscribe(postData => {
          console.log(postData);
        });
      console.log('Message sent?');
    });
  }

  companyNameRefreshed(f) {
    this.company = f;
    if (this.company.length === 0) {
      this.company = 'my company';
    }
  }
}
