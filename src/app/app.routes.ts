import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { DetailComponent } from './pages/detail/detail';
import { InvestComponent } from './pages/invest/invest';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DeveloperComponent } from './pages/developer/developer';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'developer', component: DeveloperComponent },
];
