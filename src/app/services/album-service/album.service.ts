import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumService {

  constructor(private _http: Http) { }

  getPhotos(): Observable<any> {
    return this._http.get('/api/photos')
       .map(res => res.json());
  }

  getPhotoById(id: number): Observable<any> {
    return this._http.get('/api/photos:id')
       .map(res => res.json());
  }

  addPhoto(): Observable<any> {
    return this._http.get('/api/add-photos')
       .map(res => res.json());
  }

  deletePhoto(): Observable<any> {
    return this._http.get('/api/delete-photos')
       .map(res => res.json());
  }

}
