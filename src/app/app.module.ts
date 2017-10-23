import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AlertComponent} from './components/navbar/alert/alert.component';
import {RegisterComponent} from './components/login/register/register.component';

import {ApiModule} from './services/api.module';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavbarComponent,
      AlertComponent,
      RegisterComponent,
   ],
   imports: [
      BrowserModule,
      HttpModule,
      ApiModule,
      SharedModule,

      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
