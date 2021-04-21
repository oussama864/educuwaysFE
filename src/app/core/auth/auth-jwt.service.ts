import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import {Login} from '../../auth/auth-login/login.model';
import {environment} from '../../../environments/environment';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}

  headerOptions2 = new  HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  });
  getToken(): string {
    const tokenInLocalStorage: string | null = localStorage.getItem('authenticationToken');
    const tokenInSessionStorage: string | null = localStorage.getItem('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(environment.serverUrl + '/api/authenticate', credentials, {headers: this.headerOptions2})
      .pipe(map(response => this.authenticateSuccess(response, true)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;

    if (rememberMe) {
      localStorage.setItem('authenticationToken', jwt);
      /*this.$localStorage.store('authenticationToken', jwt);
      this.$sessionStorage.clear('authenticationToken');*/
    }else {
      /*this.$sessionStorage.store('authenticationToken', jwt);
      this.$localStorage.clear('authenticationToken');*/
    }
  }
}
