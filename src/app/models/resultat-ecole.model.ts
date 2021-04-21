import {IEcole} from './ecole.model';
import {IParticipant} from './participant.model';
import {ICompetition} from './competition.model';


export interface IResultatEcole {
  id?: string;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  ecole?: IEcole | null;
  participants?: IParticipant[] | null;
  competition?: ICompetition | null;
}

export class ResultatEcole implements IResultatEcole {
  constructor(
    public id?: string,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public ecole?: IEcole | null,
    public participants?: IParticipant[] | null,
    public competition?: ICompetition | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getResultatEcoleIdentifier(resultatEcole: IResultatEcole): string | undefined {
  return resultatEcole.id;
}
