import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { DetailComponent } from './pages/detail/detail';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { InvestComponent } from './pages/invest/invest';
import { PaymentComponent } from './pages/payment/payment';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DeveloperComponent } from './pages/developer/developer';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { OnboardingComponent } from './pages/onboarding/onboarding';
import { KycComponent } from './pages/kyc/kyc';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // Projects
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'detail', component: DetailComponent }, // keep for backward compat

  // Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Protected Routes
  { path: 'onboarding', component: OnboardingComponent, canActivate: [authGuard] },
  { path: 'kyc', component: KycComponent, canActivate: [authGuard] },
  { path: 'invest', component: InvestComponent, canActivate: [authGuard] },

  // Investment Payment Flow
  { path: 'payment/:id', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'payment-success', component: PaymentSuccessComponent, canActivate: [authGuard] },

  // Dashboard Routes with Role Guards
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, roleGuard('investor')] },
  { path: 'developer', component: DeveloperComponent, canActivate: [authGuard, roleGuard('developer')] },
];
