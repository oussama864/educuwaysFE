import {IQcmR} from './qcm-r.model';
import {IEcole} from './ecole.model';
import {ICompetition} from './competition.model';


export interface IReponse {
  id?: string;
  score?: number | null;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  qcmRS?: IQcmR[] | null;
  refEcole?: IEcole | null;
  competition?: ICompetition | null;
}

export class Reponse implements IReponse {
  constructor(
    public id?: string,
    public score?: number | null,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public qcmRS?: IQcmR[] | null,
    public refEcole?: IEcole | null,
    public competition?: ICompetition | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getReponseIdentifier(reponse: IReponse): string | undefined {
  return reponse.id;
}
