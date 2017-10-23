import {Component, OnInit} from '@angular/core';
import {Album, AlbumService} from '../../services/album-service/album.service';
import {AlertService} from '../../services/alert-service/alert.service';

@Component({
   selector: 'app-album',
   templateUrl: './album.component.html',
   styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

   model: any = {};
   loading = false;
   albums: Album[];

   constructor(private albumService: AlbumService,
               private alertService: AlertService) {
   }

   ngOnInit() {
      this.loading = true;
      this.albumService.getAlbums()
         .subscribe(
            albums => {
               this.albums = albums;
               this.loading = false;
            },
            error => {
               this.alertService.error(error);
               this.loading = false;
            });
   }

   resetForm() {
      this.model = {};
   }

   submit() {
      this.loading = true;
      const saveAlbum = [Object.assign({}, this.model)]
         .map(o => {
            return {
               _id: o.name,
               name: o.name,
               title: o.title,
               date: new Date(),
               description: o.description
            };
         })[0];

      this.albumService.addAlbum(saveAlbum)
         .subscribe(
            data => {
               this.alertService.success(data);
               this.ngOnInit();
            },
            error => {
               this.alertService.error(error);
               this.loading = false;
            });
   }

}
