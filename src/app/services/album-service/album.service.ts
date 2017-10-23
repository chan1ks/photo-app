import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseApiService} from '../base-api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Album {
   _id: string;
   name: string;
   title: string;
   date: Date;
   description: string;
}

@Injectable()
export class AlbumService extends BaseApiService {

   constructor(_http: Http) {
      super(_http);
   }

   getAlbums(): Observable<any> {
      return this.get('/albums')
         .map(res => res.json());
   }

   getAlbumById(_id: string): Observable<any> {
      return this.get(`/albums/${_id}`)
         .map(res => res.json());
   }

   addAlbum(album: Album): Observable<any> {
      return this.post('/albums', album)
         .map(res => res.json());
   }

   update(album: Album): Observable<any> {
      return this.put(`/albums/${album._id}`, album);
   }

   _delete(_id: string): Observable<any> {
      return this.get(`/albums/${_id}`)
         .map(res => res.json());
   }

}
