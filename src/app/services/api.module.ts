import { NgModule } from '@angular/core';

import {AlertService} from './alert-service/alert.service';
import {AuthService} from './auth-service/auth.service';
import {UserService} from './user-service/user.service';
import {AlbumService} from './album-service/album.service';
import {PhotoService} from './photo-service/photo.service';

@NgModule({
  providers: [
     AlertService,
     AuthService,
     UserService,
     AlbumService,
     PhotoService
  ]
})
export class ApiModule { }
