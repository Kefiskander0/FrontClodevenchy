import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http:HttpClient) {

   }


  private baseUrl = 'http://localhost:8080/api/reclamation/';  

  createReclamation(reclamation: any, from:number,to:number): Observable<object> {
    return this.http.post(`${this.baseUrl}${from}/to/${to}`, reclamation);
  }

  getAllReclamation(page: number, size: number, exactly:String): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    return this.http.get(`${this.baseUrl}reclamations/${exactly}`, { params });
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  updateReclamation(details: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, details);
  }
}
