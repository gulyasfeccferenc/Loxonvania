import { USE_COOKIE } from './auth-shared-lib.module';

import { Injectable, Optional, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from '../models/auth/AuthResponse';
import { JwtTokenData } from '../models/auth/JwtTokenData';

const storeName = 'intranet-token';
const domains = ['.loxon.eu'];

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessTokenData: JwtTokenData;
  private authData: AuthResponse;
  private jwtHelper = new JwtHelperService();

  constructor(@Optional() @Inject(USE_COOKIE) private useCookie: boolean = true) {}

  public getAuthorities(): string[] {
    this.getAuthData();
    return this.accessTokenData && this.accessTokenData.authorities ? this.accessTokenData.authorities : [];
  }

  public getUserName(): string {
    this.getAuthData();
    return this.accessTokenData ? this.accessTokenData.user_name : null;
  }

  getEverything() {
    return this.authData;
  }

  getAccessToken(): string {
    const aData = this.getAuthData();
    return aData ? aData.access_token : null;
  }

  getRefreshToken(): string {
    const aData = this.getAuthData();
    return aData ? aData.refresh_token : null;
  }

  public isAccessTokenValid(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getAccessToken());

  }

  public isRefreshTokenValid(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getRefreshToken());
  }

  public clearAuthData() {
    this.authData = null;
    this.accessTokenData = null;
    this.deleteCookie(storeName);
  }

  public setAuthData(data: AuthResponse) {
    this.setCookie(storeName, data);
    this.refreshCache(data);
  }

  public testStorage(): boolean {
    const cookieName = 'loxon-cookie-tester';
    const cookieValue = 'cookieTest-' + new Date();
    try {
      this.setCookie(cookieName, cookieValue);
      if (this.getCookie(cookieName) === cookieValue) {
        this.deleteCookie(cookieName);
        return true;
      }
    } catch (e) {}
    return false;
  }

  public getAuthData(): AuthResponse {
    if ( !this.authData ) {
      try {
        this.refreshCache(this.getCookie(storeName));
      } catch (e) {}
    }
    return this.authData;
  }

  private refreshCache(aData: AuthResponse) {
    this.accessTokenData = this.jwtHelper.decodeToken(aData.access_token);
    this.authData = aData;
  }

  private setCookie(name, value) {
    if ( this.useCookie ) {
      const date = new Date();
      date.setTime(date.getTime() + (500 * 24 * 60 * 60 * 1000));
      for (const domain of domains) {
        console.log(name + '=' + JSON.stringify(value) + '; expires=' + date.toUTCString() + '; path=/; domain=' + domain);
        document.cookie = name + '=' + JSON.stringify(value) + '; expires=' + date.toUTCString() + '; path=/; domain=' + domain;
      }
    } else {
      console.log(name, JSON.stringify(value));
      localStorage.setItem(name, JSON.stringify(value));
    }
  }

  private getCookie(name) {
    let result = null;
    if ( this.useCookie ) {
      const cookieArray = document.cookie.split(';');
      for (const cookie of cookieArray) {
        const cSplit = cookie.split(/=(.+)/);
        if ( cSplit[0] === name ) {
          try {
            result = JSON.parse(cSplit[1]);
          } catch (e) {
            result = cSplit[1];
          }
        }
      }

    } else {
      try {
        result = JSON.parse(localStorage.getItem(name));
      } catch (e) {}
    }
    return result;
  }

  private deleteCookie(name: string) {
    if ( this.useCookie ) {
      const date = new Date();
      date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
      for (const domain of domains) {
        document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/; domain=' + domain;
      }
    } else {
      try {
        localStorage.removeItem(name);
      } catch (e) {}
    }
  }

}
