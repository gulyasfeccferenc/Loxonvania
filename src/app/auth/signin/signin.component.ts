import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    console.log('login');
    const email = form.value.email;
    const password = form.value.password;
    this.authService.authenticate(email, password).subscribe((e) => {
      console.log(this.authService.getLoggedInUserName());
      console.log(this.tokenService.getUserName());
      console.log(this.tokenService.getEverything());
    }, (e) => {
      console.log('Signin error:', e);
    });
  }
}
