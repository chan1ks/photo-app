import { NgModule } from '@angular/core';

import {AlertService} from './alert-service/alert.service';
import {AlbumService} from './album-service/album.service';
import {LoginService} from './login-service/login.service';

@NgModule({
  providers: [
     AlertService,
     LoginService,
     AlbumService
  ]
})
export class ApiModule { }
