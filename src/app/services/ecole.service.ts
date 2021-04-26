import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {IEcole} from '../models/ecole.model';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<IEcole>;
export type EntityArrayResponseType = HttpResponse<IEcole[]>;

@Injectable({ providedIn: 'root' })
export class EcoleService {
  public resourceUrl = environment.serverUrl + 'api/ecole';

  constructor(protected http: HttpClient) {}

  create(ecole: IEcole): Observable<EntityResponseType> {
    return this.http
      .post<IEcole>(this.resourceUrl, ecole, { observe: 'response' });
  }

  update(ecole: IEcole): Observable<EntityResponseType> {
    return this.http
        .put<IEcole>(this.resourceUrl, ecole, {observe: 'response'});
  }

  partialUpdate(ecole: IEcole): Observable<EntityResponseType> {
    return this.http
      .patch<IEcole>(this.resourceUrl, ecole, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEcole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEcole[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
