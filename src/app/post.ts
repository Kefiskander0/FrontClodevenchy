import { User } from "./user";
import { Don } from "./don";
import { Like } from "./shared/models/like";
export class Post {
  id!: number | null| undefined; 
   nom!:String| null | undefined;
   datecreation!:Date | null | undefined;
   description!:String | null | undefined;
   dons!: Don | null | undefined;
   user!: User | null | undefined;
   likes: Like[] = []; 
 constructor() {
  this.likes = [];
}
}