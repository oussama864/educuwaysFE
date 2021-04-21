import {IQcm} from './qcm.model';
import {IAuteur} from './auteur.model';
import {ICompetition} from './competition.model';


export interface IConte {
    id?: string;
    nom?: string | null;
    type?: string | null;
    description?: string | null;
    prix?: number | null;
    language?: string | null;
    imageUrl?: string | null;
    titre?: string | null;
    nbPage?: number | null;
    maisonEdition?: string | null;
    createdBy?: string | null;
    createdDate?: Date | null;
    deleted?: boolean | null;
    deletedBy?: string | null;
    deletedDate?: Date | null;
    qcms?: IQcm[] | null;
    auteur?: IAuteur | null;
    competition?: ICompetition | null;
    emailAuteur?: string;
}

export class Conte implements IConte {
    constructor(
        public id?: string,
        public nom?: string | null,
        public type?: string | null,
        public description?: string | null,
        public prix?: number | null,
        public language?: string | null,
        public imageUrl?: string | null,
        public titre?: string | null,
        public nbPage?: number | null,
        public maisonEdition?: string | null,
        public createdBy?: string | null,
        public createdDate?: Date | null,
        public deleted?: boolean | null,
        public deletedBy?: string | null,
        public deletedDate?: Date | null,
        public qcms?: IQcm[] | null,
        public auteur?: IAuteur | null,
        public competition?: ICompetition | null,
        public emailAuteur?: string
    ) {
        this.deleted = this.deleted ?? false;
    }
}

export function getConteIdentifier(conte: IConte): string | undefined {
    return conte.id;
}
