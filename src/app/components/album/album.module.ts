import {NgModule} from '@angular/core';

import {AlbumRoutingModule} from './album-routing.module';
import {SharedModule} from '../../shared/shared.module';

import {AlbumComponent} from './album.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoDetailsComponent} from './photo-details/photo-details.component';

@NgModule({
   imports: [
      SharedModule,
      AlbumRoutingModule
   ],
   declarations: [
      AlbumComponent,
      PhotosComponent,
      PhotoDetailsComponent
   ]
})
export class AlbumModule {
}
