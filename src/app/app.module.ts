import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/Admin/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/Admin/side-bar/side-bar.component';
import { ColorModePanelComponent } from './components/color-mode-panel/color-mode-panel.component';
import { AddCarComponent } from './components/Admin/add-car/add-car.component';


import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
       NavBarComponent,
    SideBarComponent,
    ColorModePanelComponent,
    AddCarComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
