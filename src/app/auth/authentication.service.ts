import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationService {
  token: string = null;

  // constructor(private router: Router, private authService: AuthService) {}

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
    // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiSW50cmFuZXRXZWJTZXJ2aWNlcyJdLCJ1c2VyX25hbWUiOiJndWx5YXNmIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU4OTg4NTExNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9SRUdJU1RFUkVEIl0sImp0aSI6ImNkZjRlNDYyLTU3MGMtNGM3Yi05Y2I5LWJjNDQxNzIyZjBlMiIsImNsaWVudF9pZCI6IkludHJhbmV0V2ViYXBwIn0.T_njOUKXnsmNwsNL789kSaBvil_0toh-OA7Ktb-Q2Uc';
  }

  logoutUser() {
    // this.router.navigate(['/']);
    this.token = 'null';
  }

  isAuthenticated() {
    if (this.token == null) {
      // this.token = this.getToken();
    }
    // this.authService.authenticate('gulyasf', '0pelK0pel').subscribe((e) => {
    //   console.log('authed!', e);
    // });

    // if (!this.authService.isAuthenticated() || this.token == null) {
    //    this.authService.redirectToAuthServer('Loxon Idle', 'http://localhost:4200/');
    // }
    // return !this.authService.isAuthenticated();
  }
}
