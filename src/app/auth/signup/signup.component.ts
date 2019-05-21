import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  company = 'my company';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const company = form.value.company;
    this.authService.register(email, password, company);
  }

  companyNameRefreshed(f) {
    this.company = f;
    if (this.company.length === 0) {
      this.company = 'my company';
    }
  }
}
