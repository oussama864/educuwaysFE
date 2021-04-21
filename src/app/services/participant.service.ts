import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {IParticipant} from "../models/participant.model";


export type EntityResponseType = HttpResponse<IParticipant>;
export type EntityArrayResponseType = HttpResponse<IParticipant[]>;

@Injectable({ providedIn: 'root' })
export class ParticipantService {
  public resourceUrl = environment.serverUrl + 'api/participants';
  constructor(protected http: HttpClient) {}

  create(participant: IParticipant): Observable<EntityResponseType> {
    return this.http
      .post<IParticipant>(this.resourceUrl, participant, { observe: 'response' });
  }

  update(participant: IParticipant): Observable<EntityResponseType> {
    return this.http
      .put<IParticipant>(this.resourceUrl, participant, { observe: 'response' });
  }

  partialUpdate(participant: IParticipant): Observable<EntityResponseType> {
    return this.http
      .patch<IParticipant>(this.resourceUrl, participant, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IParticipant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IParticipant[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
