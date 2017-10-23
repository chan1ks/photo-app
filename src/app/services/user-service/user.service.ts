import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class UserService {

  baseUrl = '/api';

  constructor(private _http: Http) {
  }

  create(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/users/register`, user);
  }

  update(user: User): Observable<any> {
    return this._http.put(`${this.baseUrl}/users/${user._id}`, user);
  }

  _delete(_id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/users/${_id}`);
  }

}
