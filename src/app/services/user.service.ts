import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from '../models/user.model';
import {Pagination} from '../core/request/request.model';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = environment.serverUrl + 'api/users';
  constructor(private http: HttpClient) {}

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(this.resourceUrl, { observe: 'response' });
  }
}
