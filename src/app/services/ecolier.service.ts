import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEcolier} from '../models/ecolier.model';
import {environment} from '../../environments/environment';
export type EntityResponseType = HttpResponse<IEcolier>;
export type EntityArrayResponseType = HttpResponse<IEcolier[]>;

@Injectable({ providedIn: 'root' })
export class EcolierService {
  public resourceUrl = environment.serverUrl + 'api/ecoliers';
  constructor(protected http: HttpClient) {}

  create(ecolier: IEcolier): Observable<EntityResponseType> {
    return this.http
      .post<IEcolier>(this.resourceUrl, ecolier, { observe: 'response' });
  }

  update(ecolier: IEcolier): Observable<EntityResponseType> {
    return this.http
      .put<IEcolier>(this.resourceUrl, ecolier, { observe: 'response' });
  }

  partialUpdate(ecolier: IEcolier): Observable<EntityResponseType> {
    return this.http
      .patch<IEcolier>(this.resourceUrl, ecolier, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEcolier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEcolier[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
