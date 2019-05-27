
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthResponse } from '../models/auth/AuthResponse';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverPrefix = 'https://auth.intranet.loxon.eu';

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService) { }

  public redirectToAuthServer(myAppName, redirectUrl) {
    window.location.href = this.serverPrefix + '?redirect=' + encodeURIComponent(redirectUrl) + '&appname=' + encodeURIComponent(myAppName);
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      this.httpClient.post<AuthResponse>(this.serverPrefix + '/oauth/token', this.createAuthenticationRequest(username, password))
      .subscribe(
        (data) => {
          this.tokenService.setAuthData(data);
          // this.userService.setUserEmail(username);
          console.warn(this.userService.getUserData());
          // this.router.navigateByUrl('/workplace');
          observer.next(true);
          observer.complete();
        },
        (error) => {
          this.tokenService.clearAuthData();
          observer.error(error);
        });
    });
  }

  public refreshToken(): Observable<boolean> {
    return new Observable((observer) => {
      this.httpClient.post<AuthResponse>(this.serverPrefix + '/oauth/token', this.createTokenRefreshRequest()).subscribe(
        (data) => {
          this.tokenService.setAuthData(data);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          this.tokenService.clearAuthData();
          observer.error();
        });
    });
  }

  public logout(): Observable<boolean> {
    return new Observable((observer) => {
      this.httpClient.post(this.serverPrefix + '/oauth/revoke', this.tokenService.getRefreshToken()).subscribe(
        (data) => {
          this.tokenService.clearAuthData();
          this.router.navigateByUrl('/loggedout');
          observer.next(true);
          observer.complete();
        }
      );
    });
  }

  public isAuthenticated(): boolean {
    return this.tokenService.isAccessTokenValid() || this.tokenService.isRefreshTokenValid();
  }

  public userIsLikeShortName(otherEmployeeShortName: string): boolean {
    return otherEmployeeShortName && this.isAuthenticated() && this.tokenService.getUserName() === otherEmployeeShortName;
  }

  public hasRole(roleName: string): boolean {
    return this.tokenService.getAuthorities().includes(roleName);
  }

  public getLoggedInUserName(): string {
    return this.tokenService.getUserName();
  }

  private createAuthenticationRequest(username: string, password: string): string {
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', username);
    params = params.append('password', password);
    return params.toString();
  }

  private createTokenRefreshRequest(): string {
    let params = new HttpParams();
    params = params.append('grant_type', 'refresh_token');
    params = params.append('refresh_token', this.tokenService.getRefreshToken());
    return params.toString();
  }

}
