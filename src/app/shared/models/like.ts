import { Post } from "src/app/post";
import { User } from "./user";
export class Like {
    id!: number | null| undefined; 
    posts!: Post | null | undefined;
    user!: User | null | undefined ;
    liketype!: liketype;
}
export enum liketype {
    LIKE,
    DISLIKE
  }