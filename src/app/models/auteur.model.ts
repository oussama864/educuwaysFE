import {IConte} from "./conte.model";

export interface IAuteur {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    refUser?: string | null;
    createdBy?: string | null;
    createdDate?: Date | null;
    deleted?: boolean | null;
    deletedBy?: string | null;
    deletedDate?: Date | null;
    contes?: IConte[] | null;
    points?: number ;
}

export class Auteur implements IAuteur {
    constructor(
        public id?: string,
        public firstName?: string | null,
        public lastName?: string | null,
        public email?: string | null,
        public password?: string | null,
        public refUser?: string | null,
        public createdBy?: string | null,
        public createdDate?: Date | null,
        public deleted?: boolean | null,
        public deletedBy?: string | null,
        public deletedDate?: Date | null,
        public contes?: IConte[] | null,
        public points?:number

    ) {
        this.deleted = this.deleted ?? false;
    }
}

export function getAuteurIdentifier(auteur: IAuteur): string | undefined {
    return auteur.id;
}
