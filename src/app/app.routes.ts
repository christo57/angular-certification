import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { TeamComponent } from './component/team/team.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'team/:leagueId/:teamId',
    component: TeamComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
