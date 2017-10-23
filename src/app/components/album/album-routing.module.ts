import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumComponent} from './album.component';
import {AlbumDetailsComponent} from './album-details/album-details.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoDetailsComponent} from './photo-details/photo-details.component';
import {UploadComponent} from './upload/upload.component';

const routes: Routes = [
   {path: '', component: AlbumComponent},
   {path: 'album-details/:id', component: AlbumDetailsComponent},
   {path: 'photos', component: PhotosComponent},
   {path: 'photos/:id', component: PhotoDetailsComponent},
   {path: 'upload', component: UploadComponent},
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   providers: [],
   exports: [RouterModule]
})
export class AlbumRoutingModule {
}
