import { HttpClientModule } from '@angular/common/http';
import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedoutComponent } from './loggedout/loggedout.component';


export const USE_COOKIE = new InjectionToken('Use Cookie or LocalStore');

@NgModule({
  declarations: [LoggedoutComponent],
  exports: [],
  imports: [CommonModule, HttpClientModule],
})
export class AuthSharedLibModule {

  static forRoot(useCookie: boolean = true): ModuleWithProviders {
    return {
      ngModule: AuthSharedLibModule,
      providers: [
        { provide: USE_COOKIE, useValue: useCookie },
      ]
    };
  }

}
