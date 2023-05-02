import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class EventService {


  readonly API_URL = 'http://localhost:8089/api/event';
  
  constructor(private http:HttpClient) { }
 
  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API_URL + '/all')
      .pipe(map(response => response || {}),
        catchError(this.handleError<any>('/all'))
      );
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
