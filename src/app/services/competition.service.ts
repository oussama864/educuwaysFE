import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompetition, getCompetitionIdentifier } from '../competition.model';

export type EntityResponseType = HttpResponse<ICompetition>;
export type EntityArrayResponseType = HttpResponse<ICompetition[]>;

@Injectable({ providedIn: 'root' })
export class CompetitionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/competitions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(competition: ICompetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(competition);
    return this.http
      .post<ICompetition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(competition: ICompetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(competition);
    return this.http
      .put<ICompetition>(`${this.resourceUrl}/${getCompetitionIdentifier(competition) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(competition: ICompetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(competition);
    return this.http
      .patch<ICompetition>(`${this.resourceUrl}/${getCompetitionIdentifier(competition) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICompetition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompetition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCompetitionToCollectionIfMissing(
    competitionCollection: ICompetition[],
    ...competitionsToCheck: (ICompetition | null | undefined)[]
  ): ICompetition[] {
    const competitions: ICompetition[] = competitionsToCheck.filter(isPresent);
    if (competitions.length > 0) {
      const competitionCollectionIdentifiers = competitionCollection.map(competitionItem => getCompetitionIdentifier(competitionItem)!);
      const competitionsToAdd = competitions.filter(competitionItem => {
        const competitionIdentifier = getCompetitionIdentifier(competitionItem);
        if (competitionIdentifier == null || competitionCollectionIdentifiers.includes(competitionIdentifier)) {
          return false;
        }
        competitionCollectionIdentifiers.push(competitionIdentifier);
        return true;
      });
      return [...competitionsToAdd, ...competitionCollection];
    }
    return competitionCollection;
  }

  protected convertDateFromClient(competition: ICompetition): ICompetition {
    return Object.assign({}, competition, {
      createdDate: competition.createdDate?.isValid() ? competition.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: competition.deletedDate?.isValid() ? competition.deletedDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
      res.body.deletedDate = res.body.deletedDate ? dayjs(res.body.deletedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((competition: ICompetition) => {
        competition.createdDate = competition.createdDate ? dayjs(competition.createdDate) : undefined;
        competition.deletedDate = competition.deletedDate ? dayjs(competition.deletedDate) : undefined;
      });
    }
    return res;
  }
}
