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

   constructor(_http: Http) {
      super(_http);
   }

   getPhotos(_id: string): Observable<any> {
      return this.get(`/photos/${_id}`)
         .map(res => res.json());
   }

   getPhotoById(_id: string): Observable<any> {
      return this.get(`/photos/${_id}`)
         .map(res => res.json());
   }

   addPhoto(photo: Photo, file: File[]): Observable<any> {
      return this.post('/photos', {photo: photo, file: file})
         .map(res => res.json());
   }

   update(photo: Photo): Observable<any> {
      return this.put(`/photos/${photo._id}`, photo);
   }

   _delete(_id: string): Observable<any> {
      return this.get(`/photos/${_id}`)
         .map(res => res.json());
   }

}
