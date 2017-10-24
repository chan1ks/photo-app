import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from '../../../services/album-service/album.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';
import {Photo, PhotoService} from '../../../services/photo-service/photo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestOptions, Headers} from '@angular/http';

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
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
         const file: File = fileList[0];
         // this.srcURL = this.sanitizer.bypassSecurityTrustUrl(event.srcElement.value);
         // this.model.filename = event.target.files[0].name;

         const formData: FormData = new FormData();
         formData.append('file', file, file.name);

         this.model = formData;
      }
   }

   submit() {
      this.loading = true;
      /*const savePhoto = [Object.assign({}, this.model)]
       .map(o => {
       return {
       _id: o.filename,
       filename: o.filename,
       albumId: this.id,
       description: o.description || '',
       uploadDate: new Date(),
       };
       })[0];*/

      const headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({headers: headers});

      this.photoService.addPhoto(this.model, options)
         .subscribe(
            data => {
               this.alertService.success(data);
               this.router.navigate([this.returnUrl]);
            },
            error => {
               this.alertService.error(error);
               this.loading = false;
            });

      /*this.photoService.upload(this.model)
       .then(res => {
       this.alertService.success(res);
       // this.router.navigate([this.returnUrl]);
       },
       error => {
       this.alertService.error(error);
       this.loading = false;
       });*/
   }

}
