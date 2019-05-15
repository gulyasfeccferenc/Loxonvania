import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string = null;

  constructor(private router: Router) {}

  signupUser(email: string, password: string, company: string) {
    // TODO: Implement backend calling here like backend.auth().signup(email, password, company).catch(error => console.log(error))
    // .router.navigate(['/'])
  }

  signinUser(email: string, password: string) {
    // TODO: Implement backend calling here like backend.auth().signin(email, password, company).catch(error => console.log(error))
    // .router.navigate(['/'])
  }

  getToken() {
    // TODO: Similar method to make sure user was authenticated
  }

  logoutUser() {
    this.router.navigate(['/']);
    this.token = 'null';
  }

  isAuthenticated() {
    return this.token == null;
  }
}
