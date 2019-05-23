import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { provideIntranetTokenInterceptor } from './auth/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { AchievmentsComponent } from './achievments/achievments.component';
import { WidgetComponent } from './widget/widget.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './auth/authentication.service';
import {AuthGuardService} from './auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import {LoggedoutComponent} from './auth/loggedout/loggedout.component';
import {AchievmentPipe} from './achievments/achievment.pipe';


const appRoutes: Routes = [
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    component: DashboardComponent
  },
  { path: 'workplace',
    component: WorkplaceComponent
  },
  { path: 'achievments',
    component: AchievmentsComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    WorkplaceComponent,
    AchievmentsComponent,
    WidgetComponent,
    SignupComponent,
    SigninComponent,
    LoggedoutComponent,
    AchievmentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuardService, provideIntranetTokenInterceptor()],
  bootstrap: [AppComponent]
})
export class AppModule { }
