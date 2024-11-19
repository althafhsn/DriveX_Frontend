import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLandingComponent } from './components/dashboard/admin-landing/admin-landing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,  },
  { path : 'dashboard', component:DashboardComponent,
    children : [
      { path: '', redirectTo: './admin-landing', pathMatch: 'full' },
      {path: '',component:AdminLandingComponent}
    ]
   } //canActivate: [authGuard]
];
 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
