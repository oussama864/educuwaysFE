import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReponse} from '../models/reponse.model';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<IReponse>;
export type EntityArrayResponseType = HttpResponse<IReponse[]>;

@Injectable({ providedIn: 'root' })
export class ReponseService {

  public resourceUrl = environment.serverUrl + 'api/reponses';
  constructor(protected http: HttpClient) {}

  create(reponse: IReponse): Observable<EntityResponseType> {
    return this.http
      .post<IReponse>(this.resourceUrl, reponse, { observe: 'response' });
  }

  update(reponse: IReponse): Observable<EntityResponseType> {
    return this.http
      .put<IReponse>(this.resourceUrl, reponse, { observe: 'response' });
  }

  partialUpdate(reponse: IReponse): Observable<EntityResponseType> {
    return this.http
      .patch<IReponse>(this.resourceUrl, reponse, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IReponse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IReponse[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
