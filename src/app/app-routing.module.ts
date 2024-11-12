import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { SearchComponent } from './components/Customer/search/search.component';
import { ConformRentComponent } from './components/Customer/conform-rent/conform-rent.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'LandingPage',component:LandingPageComponent},
  {path:'search',component:SearchComponent},
  {path:'ConformRent',component:ConformRentComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
