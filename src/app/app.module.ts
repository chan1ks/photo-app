import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertComponent } from './components/navbar/alert/alert.component';

import {ApiModule} from './services/api.module';
import {AlbumModule} from './components/album/album.module';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import { LogoutComponent } from './components/login/logout/logout.component';
import { RegisterComponent } from './components/login/register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavbarComponent,
      AlertComponent,
      LogoutComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      ApiModule,
      SharedModule,

      AlbumModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
