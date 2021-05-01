import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  headerOptions2 = new  HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  });

  url =  environment.serverUrl + '/api/register';
  registreType = 'auteur';
  constructor(private http: HttpClient) {}
  save(registration: { firstName: any; lastName: any; password: any; langKey: string; login: any; email: any; authorities: string[]; }): Observable<{}> {
    return this.http.post(this.url, registration, {headers: this.headerOptions2});
  }
}
