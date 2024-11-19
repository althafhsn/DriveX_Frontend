import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { ConformRentComponent } from './components/Customer/conform-rent/conform-rent.component';
import { AllCarsComponent } from './components/Customer/all-cars/all-cars.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'LandingPage',pathMatch:'full'},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'LandingPage',component:LandingPageComponent},
  {path:'ConformRent',component:ConformRentComponent},
  {path:'Explorecar',component:AllCarsComponent},
  { path: 'register', component: RegisterComponent,  },
  { path : 'dashboard', component:DashboardComponent, canActivate: [authGuard]}
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
