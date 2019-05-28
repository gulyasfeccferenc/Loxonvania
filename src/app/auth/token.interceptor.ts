import { AuthService } from './auth.service';
import { Injectable, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { TokenService } from './token.service';

declare const moment;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  credentials = 'SW50cmFuZXRXZWJhcHA6ZHNmQVJFYWRmdzMycnR3ZTU0Z1NE';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/oauth/token')) {
      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Basic ${this.credentials}`,
          'Content-Type': `application/x-www-form-urlencoded; charset=utf-8`
        }
      }));
    } else {
      if (this.authService != null && this.authService.isAuthenticated()) {
        if (this.tokenService.isAccessTokenValid()) {
          return next.handle(request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + this.tokenService.getAccessToken()
            }
          }));
        } else {
          // Refresh hell FIXME :(
          const ret = new Subject<HttpEvent<any>>();
          const p = new Promise((resolve, reject) => {
            this.authService.refreshToken().toPromise().then(response => resolve()).catch(error => reject(error));
          });
          p.then(() => this.intercept(request, next).toPromise()
              .then(event => ret.next(event))
              .catch(error => ret.error(error))
          ).catch(error => {
              ret.error(error);
              this.authService.logout().subscribe(data => {
                console.log('Logout done!');
              });
          });
          return ret.asObservable();
        }
      } else {
        return next.handle(request);
      }
    }
  }

}

export function provideIntranetTokenInterceptor(): Provider {
  return { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true };
}
