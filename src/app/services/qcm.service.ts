import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IQcm} from '../models/qcm.model';
import {environment} from '../../environments/environment';


export type EntityResponseType = HttpResponse<IQcm>;
export type EntityArrayResponseType = HttpResponse<IQcm[]>;

@Injectable({ providedIn: 'root' })
export class QcmService {
  public resourceUrl = environment.serverUrl + '/api/qcms';
  constructor(protected http: HttpClient) {}

  create(qcm: IQcm): Observable<EntityResponseType> {
    return this.http
      .post<IQcm>(this.resourceUrl, qcm, { observe: 'response' });
  }

  update(qcm: IQcm): Observable<EntityResponseType> {
    return this.http
      .put<IQcm>(this.resourceUrl, qcm, { observe: 'response' });
  }

  partialUpdate(qcm: IQcm): Observable<EntityResponseType> {
    return this.http
      .patch<IQcm>(this.resourceUrl, qcm, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IQcm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IQcm[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
