import { Post } from "./post";
import { User } from "./user";
export class Don {
    id!:number | null| undefined;
    image!:string | null| undefined;
    type!:DonType | null| undefined;
    posts!: Post[] | null | undefined;
    users!: User[] | null |undefined;

}
export enum DonType {
    Clothers,
	SchoolTools,
	Money,
	Food
  }