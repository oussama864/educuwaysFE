import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment';
import {ICompetition} from '../models/competition.model';

export type EntityResponseType = HttpResponse<ICompetition>;
export type EntityArrayResponseType = HttpResponse<ICompetition[]>;

@Injectable({ providedIn: 'root' })
export class CompetitionService {
  public resourceUrl = environment.serverUrl + '/api/competitions';
  constructor(protected http: HttpClient) {}

  create(competition: ICompetition): Observable<EntityResponseType> {
    return this.http
      .post<ICompetition>(this.resourceUrl, competition, { observe: 'response' });
  }

  update(competition: ICompetition): Observable<EntityResponseType> {
    return this.http
      .put<ICompetition>(this.resourceUrl, competition, { observe: 'response' });
  }

  partialUpdate(competition: ICompetition): Observable<EntityResponseType> {
    return this.http
      .patch<ICompetition>(this.resourceUrl, competition, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICompetition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICompetition[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
