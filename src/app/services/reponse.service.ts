import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReponse, getReponseIdentifier } from '../reponse.model';

export type EntityResponseType = HttpResponse<IReponse>;
export type EntityArrayResponseType = HttpResponse<IReponse[]>;

@Injectable({ providedIn: 'root' })
export class ReponseService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/reponses');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(reponse: IReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reponse);
    return this.http
      .post<IReponse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reponse: IReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reponse);
    return this.http
      .put<IReponse>(`${this.resourceUrl}/${getReponseIdentifier(reponse) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reponse: IReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reponse);
    return this.http
      .patch<IReponse>(`${this.resourceUrl}/${getReponseIdentifier(reponse) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IReponse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReponse[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReponseToCollectionIfMissing(reponseCollection: IReponse[], ...reponsesToCheck: (IReponse | null | undefined)[]): IReponse[] {
    const reponses: IReponse[] = reponsesToCheck.filter(isPresent);
    if (reponses.length > 0) {
      const reponseCollectionIdentifiers = reponseCollection.map(reponseItem => getReponseIdentifier(reponseItem)!);
      const reponsesToAdd = reponses.filter(reponseItem => {
        const reponseIdentifier = getReponseIdentifier(reponseItem);
        if (reponseIdentifier == null || reponseCollectionIdentifiers.includes(reponseIdentifier)) {
          return false;
        }
        reponseCollectionIdentifiers.push(reponseIdentifier);
        return true;
      });
      return [...reponsesToAdd, ...reponseCollection];
    }
    return reponseCollection;
  }

  protected convertDateFromClient(reponse: IReponse): IReponse {
    return Object.assign({}, reponse, {
      createdDate: reponse.createdDate?.isValid() ? reponse.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: reponse.deletedDate?.isValid() ? reponse.deletedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((reponse: IReponse) => {
        reponse.createdDate = reponse.createdDate ? dayjs(reponse.createdDate) : undefined;
        reponse.deletedDate = reponse.deletedDate ? dayjs(reponse.deletedDate) : undefined;
      });
    }
    return res;
  }
}
