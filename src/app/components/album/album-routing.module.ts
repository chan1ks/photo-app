import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumComponent} from './album.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoDetailsComponent} from './photo-details/photo-details.component';

const routes: Routes = [
   {path: '', component: AlbumComponent},
   {path: 'photos', component: PhotosComponent},
   {path: 'photos/:id', component: PhotoDetailsComponent},
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
