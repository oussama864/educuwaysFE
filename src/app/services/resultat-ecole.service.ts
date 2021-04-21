import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IResultatEcole} from '../models/resultat-ecole.model';
import {environment} from '../../environments/environment';
export type EntityResponseType = HttpResponse<IResultatEcole>;
export type EntityArrayResponseType = HttpResponse<IResultatEcole[]>;

@Injectable({ providedIn: 'root' })
export class ResultatEcoleService {
  public resourceUrl = environment.serverUrl + 'api/resultat-ecoles';
  constructor(protected http: HttpClient) {}

  create(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    return this.http
      .post<IResultatEcole>(this.resourceUrl, resultatEcole, { observe: 'response' });
  }

  update(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    return this.http
      .put<IResultatEcole>(this.resourceUrl, resultatEcole, { observe: 'response' });
  }

  partialUpdate(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    return this.http
      .patch<IResultatEcole>(this.resourceUrl, resultatEcole, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IResultatEcole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IResultatEcole[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
