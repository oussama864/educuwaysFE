import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../../../environments/environment';
import {IConte} from '../../../models/conte.model';


export type EntityResponseType = HttpResponse<IConte>;
export type EntityArrayResponseType = HttpResponse<IConte[]>;

@Injectable({ providedIn: 'root' })
export class ConteService {
  public resourceUrl = environment.serverUrl + '/api/conte';

  constructor(protected http: HttpClient) {}

  create(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .post<IConte>(this.resourceUrl + '/ajout', conte, { observe: 'response' });
  }
  createConteWithImage(formData: FormData): Observable<EntityResponseType> {
    return this.http
        .post<IConte>(this.resourceUrl + '/ajouter_conte', formData, { observe: 'response' });
  }
  getMyContes(emailAuteur: string): Observable<EntityArrayResponseType>{
    return this.http
        .get<IConte[]>(this.resourceUrl + '/all-contes/' + emailAuteur, { observe: 'response' });
  }


  update(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .put<IConte>(environment.serverUrl + '/api/contes/'+conte.id, conte, { observe: 'response' });
  }

  partialUpdate(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .patch<IConte>(`${this.resourceUrl}`, conte, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IConte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IConte[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }



}
