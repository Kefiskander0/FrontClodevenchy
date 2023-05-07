import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Don, DonType } from './don';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DonService {
 
  readonly API_URL = "http://localhost:8080"
  readonly ENDPOINT_DON="/don"


  constructor(private httpClient: HttpClient) { }

  getDonsByPostId(id: number): Observable<Don[]> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<Don[]>(url);
  }
  getDonsByUserId(userId: number): Observable<Don[]> {
    const url = `${this.API_URL}/dons/${userId}`;
    return this.httpClient.get<Don[]>(url);
  }
 
  addDon(don: Don, userId: number, postId: number): Observable<Don> {
    const url = `${this.API_URL}/addon?postId=${postId}&userId=${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<Don>(url, don, httpOptions);
  }
  deletepost(id: number): Observable<void> {
    const url = `${this.API_URL}/deleteDon/${id}`;
    return this.httpClient.delete<void>(url);
  }
  retrieveAllPost(): Observable<Don[]> {
    return this.httpClient.get<Don[]>(this.API_URL + this.ENDPOINT_DON);
  }
  getDonsBy(userId: number): Observable<Don[]> {
    const url = `${this.API_URL}/x/${userId}`;
    return this.httpClient.get<Don[]>(url);
}
updatePost(don: Don): Observable<Don> {
  const url = `${this.API_URL}/updatedon`;
  return this.httpClient.put<Don>(url, don);
}

createDon(don: Don, image: File): Observable<any> {
  const formData = new FormData();
  formData.append('image', image, image.name);
 return this.httpClient.post<any>(this.API_URL, formData);
}




addDonToPost(postId: number, don: any): Observable<any> {
  return this.httpClient.post(`/api/posts/${postId}/dons`, don);






}
}
