import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album, AlbumService} from '../../../services/album-service/album.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';
import {Photo, PhotoService} from '../../../services/photo-service/photo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
   selector: 'app-album-details',
   templateUrl: './album-details.component.html',
   styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {

   model: any = {};
   loading = false;
   album: Album;
   photos: Photo[];

   newFiles: File[] = [];

   srcURL: any;

   private returnUrl: string;
   private id: string;
   private sub: any;

   constructor(private router: Router,
               private photoService: PhotoService,
               private alertService: AlertService,
               private route: ActivatedRoute,
               private sanitizer: DomSanitizer) {
   }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.id = params['id'];

         this.photoService.getPhotos(this.id)
            .subscribe(
               data => {
                  this.photos = data;
               },
               error => {
                  this.alertService.error(error);
                  this.loading = false;
               });
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/albums';
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   resetForm() {
      this.model = {};
   }

   fileEvent(event) {
      this.srcURL = this.sanitizer.bypassSecurityTrustUrl(event.srcElement.value);
      this.model.filename = event.target.files[0].name;
      const fileList: FileList = event.target.files;

      for (let i = 0; i < fileList.length; i++) {
         this.newFiles.push(fileList.item(i));
      }
   }

   submit() {
      this.loading = true;
      const savePhoto = [Object.assign({}, this.model)]
         .map(o => {
            return {
               _id: o.filename,
               filename: o.filename,
               albumId: this.id,
               description: o.description || '',
               uploadDate: new Date(),
            };
         })[0];

      this.photoService.addPhoto(savePhoto, this.newFiles)
         .subscribe(
            data => {
               this.alertService.success(data);
               this.router.navigate([this.returnUrl]);
            },
            error => {
               this.alertService.error(error);
               this.loading = false;
            });
   }

}
