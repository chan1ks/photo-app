import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BaseApiService} from '../base-api.service';

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class UserService extends BaseApiService {

  constructor(_http: Http) {
    super(_http);
  }

  getAll(): Observable<any> {
    return this.get(`${this.baseUrl}/users`)
       .map(res => res.json());
  }

  getById(_id: string): Observable<any> {
    return this.get(`${this.baseUrl}/users/${_id}`)
       .map(res => res.json());
  }

  create(user: User): Observable<any> {
    return this.post(`${this.baseUrl}/users/register`, user);
  }

  update(user: User): Observable<any> {
    return this.put(`${this.baseUrl}/users/` + user._id, user);
  }

  _delete(_id: string): Observable<any> {
    return this.$delete(`${this.baseUrl}/users/` + _id);
  }

}
