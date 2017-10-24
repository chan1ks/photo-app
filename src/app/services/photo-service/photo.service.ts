import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BaseApiService} from '../base-api.service';
import 'rxjs/add/operator/map';

export interface Photo {
   _id: string;
   filename: string;
   albumId: string;
   description: string;
   uploadDate: Date;
}

@Injectable()
export class PhotoService extends BaseApiService {

   private static setUploadUpdateInterval(interval: number): void {
      setInterval(() => {
      }, interval);
   }

   constructor(_http: Http) {
      super(_http);
   }

   getPhotos(albumId: string): Observable<any> {
      return this.get(`/photos/${albumId}`)
         .map(res => res.json());
   }

   getPhotoById(filename: string): Observable<any> {
      return this.get(`/photos/${filename}`)
         .map(res => res.json());
   }

   addPhoto(formData: FormData, options?): Observable<any> {
      return this.post('/photos', formData, options)
         .map(res => res.json());
   }

   upload(files: File[]): Promise<any> {
      return new Promise((resolve, reject) => {
         const formData: FormData = new FormData();
         const xhr: XMLHttpRequest = new XMLHttpRequest();

         for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i], files[i].name);
         }

         xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
               if (xhr.status === 200) {
                  resolve(JSON.parse(xhr.response));
               } else {
                  reject(xhr.response);
               }
            }
         };

         PhotoService.setUploadUpdateInterval(500);

         // TODO: progress bar stuff
         /*xhr.upload.onprogress = (event) => {
          this.progress = Math.round(event.loaded / event.total * 100);

          this.progressObserver.next(this.progress);
          };*/

         xhr.open('POST', '/api/photos', true);
         xhr.setRequestHeader('Content-Type', 'multipart/form-data');
         xhr.setRequestHeader('Accept', 'application/json');
         xhr.send(formData);
      });
   }

   update(photo: Photo): Observable<any> {
      return this.put(`/photos/${photo._id}`, photo);
   }

   _delete(_id: string): Observable<any> {
      return this.get(`/photos/${_id}`)
         .map(res => res.json());
   }

}
