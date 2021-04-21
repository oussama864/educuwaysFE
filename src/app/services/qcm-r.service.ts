import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQcmR, getQcmRIdentifier } from '../qcm-r.model';

export type EntityResponseType = HttpResponse<IQcmR>;
export type EntityArrayResponseType = HttpResponse<IQcmR[]>;

@Injectable({ providedIn: 'root' })
export class QcmRService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/qcm-rs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.post<IQcmR>(this.resourceUrl, qcmR, { observe: 'response' });
  }

  update(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.put<IQcmR>(`${this.resourceUrl}/${getQcmRIdentifier(qcmR) as string}`, qcmR, { observe: 'response' });
  }

  partialUpdate(qcmR: IQcmR): Observable<EntityResponseType> {
    return this.http.patch<IQcmR>(`${this.resourceUrl}/${getQcmRIdentifier(qcmR) as string}`, qcmR, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IQcmR>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQcmR[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQcmRToCollectionIfMissing(qcmRCollection: IQcmR[], ...qcmRSToCheck: (IQcmR | null | undefined)[]): IQcmR[] {
    const qcmRS: IQcmR[] = qcmRSToCheck.filter(isPresent);
    if (qcmRS.length > 0) {
      const qcmRCollectionIdentifiers = qcmRCollection.map(qcmRItem => getQcmRIdentifier(qcmRItem)!);
      const qcmRSToAdd = qcmRS.filter(qcmRItem => {
        const qcmRIdentifier = getQcmRIdentifier(qcmRItem);
        if (qcmRIdentifier == null || qcmRCollectionIdentifiers.includes(qcmRIdentifier)) {
          return false;
        }
        qcmRCollectionIdentifiers.push(qcmRIdentifier);
        return true;
      });
      return [...qcmRSToAdd, ...qcmRCollection];
    }
    return qcmRCollection;
  }
}
