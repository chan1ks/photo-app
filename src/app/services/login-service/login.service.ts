import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BaseApiService} from '../base-api.service';

@Injectable()
export class LoginService extends BaseApiService {

  constructor(_http: Http) {
    super(_http);
  }

  login(username: string, password: string): Observable<any> {
    return this.post('/users/authenticate', { username: username, password: password })
       .map((response: Response) => {
         // login successful if there's a jwt token in the response
         const user = response.json();
         if (user) {
         // if (user && user.token) {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           localStorage.setItem('currentUser', JSON.stringify(user));
         }

         return user;
       });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
