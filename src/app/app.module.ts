import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { AchievmentsComponent } from './achievments/achievments.component';
import { WorkerComponent } from './models/worker/worker.component';
import { AchievmentComponent } from './models/achievment/achievment.component';
import { LevelComponent } from './models/level/level.component';
import { WidgetComponent } from './widget/widget.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';

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
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    WorkplaceComponent,
    AchievmentsComponent,
    WorkerComponent,
    AchievmentComponent,
    LevelComponent,
    WidgetComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
