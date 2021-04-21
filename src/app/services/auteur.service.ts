import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {IAuteur} from '../models/auteur.model';

export type EntityResponseType = HttpResponse<IAuteur>;
export type EntityArrayResponseType = HttpResponse<IAuteur[]>;

@Injectable({ providedIn: 'root' })
export class AuteurService {
  public resourceUrl = environment.serverUrl + '/api/auteur';

  constructor(protected http: HttpClient) {}

  create(auteur: IAuteur): Observable<EntityResponseType> {
    return this.http
      .post<IAuteur>(this.resourceUrl, auteur, { observe: 'response' });
  }

  update(auteur: IAuteur): Observable<EntityResponseType> {
    return this.http
      .put<IAuteur>(this.resourceUrl, auteur, { observe: 'response' });

  }

  partialUpdate(auteur: IAuteur): Observable<EntityResponseType> {
    return this.http
      .patch<IAuteur>(this.resourceUrl, auteur, { observe: 'response' });
  }

  find(email: string): Observable<EntityResponseType> {
    return this.http.get<IAuteur>(this.resourceUrl + '/' + email, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IAuteur[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
