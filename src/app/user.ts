import { Post } from "./post";

export class User {
    id!:number;
    mailAddress!:string;
    phoneNumber!:string;
    name!:string;
    location!:string;
    password!:string;
    unavailibility!:Date;
    isDisabled!: boolean;
    certificat!:string;
    posts!: Post[];
    role!: Role;
}
export enum Role {
    HELPER,
	ORGANIZATION
  }