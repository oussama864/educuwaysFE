import {IReponse} from './reponse.model';
import {IEcolier} from './ecolier.model';
import {IParticipant} from './participant.model';
import {IQcm} from './qcm.model';
import {IConte} from './conte.model';
import {IResultatEcole} from './resultat-ecole.model';


export interface ICompetition {
  id?: string;
  date?: string | null;
  code?: number | null;
  score?: number | null;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  reponses?: IReponse[] | null;
  ecoliers?: IEcolier[] | null;
  participants?: IParticipant[] | null;
  qcms?: IQcm[] | null;
  contes?: IConte[] | null;
  resultatEcoles?: IResultatEcole[] | null;
}

export class Competition implements ICompetition {
  constructor(
    public id?: string,
    public date?: string | null,
    public code?: number | null,
    public score?: number | null,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public reponses?: IReponse[] | null,
    public ecoliers?: IEcolier[] | null,
    public participants?: IParticipant[] | null,
    public qcms?: IQcm[] | null,
    public contes?: IConte[] | null,
    public resultatEcoles?: IResultatEcole[] | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getCompetitionIdentifier(competition: ICompetition): string | undefined {
  return competition.id;
}
