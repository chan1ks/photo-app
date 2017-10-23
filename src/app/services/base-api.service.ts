import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export interface Options {
   request?: any;
   headers?: any;
   body?: any;
   params?: any;
   search?: any;
   withCredentials?: boolean;
}

@Injectable()
export class BaseApiService {
   
   baseUrl = '/api';

   constructor(private _http: Http) {
   }

   get(url: string, options?: Options): Observable<Response> {
      return this._http.get(`${this.baseUrl}${url}`, this.addJwt(options)).catch(this.handleError);
   }

   post(url: string, body: any, options?: Options): Observable<Response> {
      return this._http.post(`${this.baseUrl}${url}`, body, this.addJwt(options)).catch(this.handleError);
   }

   put(url: string, body: any, options?: Options): Observable<Response> {
      return this._http.put(`${this.baseUrl}${url}`, body, this.addJwt(options)).catch(this.handleError);
   }

   $delete(url: string, options?: Options): Observable<Response> {
      return this._http.delete(`${this.baseUrl}${url}`, this.addJwt(options)).catch(this.handleError);
   }

   // private helper methods

   private addJwt(options?: Options): Options {
      // ensure request options and headers are not null
      options = options || new RequestOptions();
      options.headers = options.headers || new Headers();

      // add authorization header with jwt token
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
         options.headers.append('Authorization', 'Bearer ' + currentUser.token);
      }

      return options;
   }

   private handleError(error: any) {
      if (error.status === 401) {
         // 401 unauthorized response so log user out of client
         window.location.href = '/login';
      }

      return Observable.throw(error._body);
   }

}
