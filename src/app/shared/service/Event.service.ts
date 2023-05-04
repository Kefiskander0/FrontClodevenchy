import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Evenment } from '../models/event.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class EventService {


  public API_URL = 'http://localhost:8089/api/event';
  
  constructor(private http:HttpClient) { }
 
  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API_URL + '/all')
      .pipe(map(response => response || {}),
        catchError(this.handleError<any>('/all'))
      );
    }
    
   // deleteEvent(id: any): Observable<any> {
     // const url = `${this.API_URL}/delete/${id}`;
      //return this.http.delete(url)
        //.pipe(
          //catchError(this.handleError<any>(`${this.API_URL}/delete/${id}`))
        //);
    //}
    getEventbyName(name : any ){
      return this.http.get<Event>(this.API_URL+'/allName/'+name)
    }


    searchByNameEvent(request: any, search: any){
      const params = request;
      const name = search;
      return this.http.get<Evenment[]>(this.API_URL+'/search/'+name, {params})
    }
  
  

    deleteEvent(id: any) {
               console.log("service deletd id ",id)
      return this.http.delete(`${this.API_URL}/delete/${id}`)
        .pipe(map(response => response || {}),
          catchError(this.handleError<any>('/delete/'))
        );
    }
  
    

    addEvent(event : any) {
      return this.http.post(`${this.API_URL}/add`,event)
    }

    errorHandler(error: HttpErrorResponse) {
      return throwError(error.message || 'Server Error');
    }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


 

  }
