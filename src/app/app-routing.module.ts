import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {WorkplaceComponent} from './workplace/workplace.component';
import {AchievmentsComponent} from './achievments/achievments.component';
import {LoggedoutComponent} from './auth/loggedout/loggedout.component';
import {ProfileComponent} from './auth/profile/profile.component';


const routes: Routes = [
  {path: '', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'workplace', component: WorkplaceComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'achievments', component: AchievmentsComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'loggedout', component: LoggedoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
