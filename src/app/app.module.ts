import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { AdminLandingComponent } from './components/dashboard/admin-landing/admin-landing.component';
import { TodayStatsComponent } from './components/dashboard/admin-landing/today-stats/today-stats.component';
import { CarAvailabilityComponent } from './components/dashboard/admin-landing/car-availability/car-availability.component';
import { LiveCarStatusComponent } from './components/dashboard/admin-landing/live-car-status/live-car-status.component';
import { EarningSummaryComponent } from './components/dashboard/admin-landing/earning-summary/earning-summary.component';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/dashboard/side-bar/side-bar.component';
import { CustomerComponent } from './components/dashboard/customer/customer.component';
import { AllCustomersListComponent } from './components/dashboard/customer/all-customers-list/all-customers-list.component';
import { CustomerDetailsComponent } from './components/dashboard/customer/customer-details/customer-details.component';
import { CustomerPaymentComponent } from './components/dashboard/customer/customer-payment/customer-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminLandingComponent,
    TodayStatsComponent,
    CarAvailabilityComponent,
    LiveCarStatusComponent,
    EarningSummaryComponent,
    NavBarComponent,
    SideBarComponent,
    CustomerComponent,
    AllCustomersListComponent,
    CustomerDetailsComponent,
    CustomerPaymentComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, // Register the functional interceptor
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
