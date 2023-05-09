import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';



export type KeyValuePair = [string, string];

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly API_URL = "http://localhost:8080"
  readonly ENDPOINT_POST ="/post"
  
  idCommand: number =0;
  public setIdCommand(id: number) {
    this.idCommand = id;
}

likePoost(postId: number, userId: number): Observable<void> {
  const url = `${this.API_URL}/posts/${postId}/likeees/${userId}`;

  return this.httpClient.post<void>(url, {});
}

dislikePoost(postId: number, userId: number): Observable<void> {
  const url = `${this.API_URL}/posts/${postId}/dissss/${userId}`;
  return this.httpClient.post<void>(url, {});
}

  public getIdCommand(): number | null {
    return this.idCommand;
  }

  constructor(private httpClient: HttpClient) { }

  retrieveAllPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL + this.ENDPOINT_POST);
  }
  addPost(post: Post,id:any) {
    return this.httpClient.post<any>(`${this.API_URL}/addpost/${id}`, post);
  }
  deletepost(id: number): Observable<void> {
    const url = `${this.API_URL}/deletePost/${id}`;
    return this.httpClient.delete<void>(url);
  }
  updatePost(post: Post): Observable<Post> {
    const url = `${this.API_URL}/up`;
    return this.httpClient.put<Post>(url, post);
  }
  getPostsByUserId(id: number): Observable<Post[]> {
    const url = `${this.API_URL}/posts/user/${id}`;
    return this.httpClient.get<Post[]>(url);
  }
  getPostsById(id: number): Observable<Post[]> {
    const url = `${this.API_URL}/postByID/${id}`;
    return this.httpClient.get<Post[]>(url);
  }

  chercherParNom(nom: string): Observable<Post[]> {
    const url = `${this.API_URL}/postss?nom=${nom}`;
    return this.httpClient.get<Post[]>(url);
  }

  

  
  
}