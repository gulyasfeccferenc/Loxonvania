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
    LevelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
