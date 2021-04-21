import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IQcmR} from '../models/qcm-r.model';
import {environment} from '../../environments/environment';



export type EntityResponseType = HttpResponse<IQcmR>;
export type EntityArrayResponseType = HttpResponse<IQcmR[]>;

@Injectable({ providedIn: 'root' })
export class QcmRService {
  public resourceUrl = environment.serverUrl + 'api/qcm-rs';
  constructor(protected http: HttpClient) {}

  create(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.post<IQcmR>(this.resourceUrl, qcmR, { observe: 'response' });
  }

  update(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.put<IQcmR>(this.resourceUrl, qcmR, { observe: 'response' });
  }

  partialUpdate(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.patch<IQcmR>(this.resourceUrl, qcmR, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IQcmR>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<IQcmR[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
