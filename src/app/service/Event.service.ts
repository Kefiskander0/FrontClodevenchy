import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export const evenmentEndpoint = environment.evenmentEndpoint

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  GetAllEvenment(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(evenmentEndpoint + 'evenment/GetAllEvenment')
      .pipe(map(response => response || {}),
        catchError(this.handleError<any>('getAllEvenment'))
      );
  }
 Create(evenment: Event): Observable<any>
   {
     return this.httpClient.post<any>(evenmentEndpoint+ 'event/Create', evenment)
          .pipe(
           catchError(this.handleError('create', evenment))
         );
 }


  Update(evenment: Event): Observable<any> {
    return this.httpClient.put<any>(evenmentEndpoint + 'event/Update' , evenment) 
      .pipe(
        catchError(this.handleError('update', evenment))
    );
  }



  Delete(iD: string) {
    return this.httpClient.delete(evenmentEndpoint + 'event/Delete', { params: { 'id': iD } })
      .pipe(map(response => response || {}),
        catchError(this.handleError<any>('delete'))
      ); }



  errorHandler(error: HttpErrorResponse) {
   //return Observable.throw(error.message || 'Server Error');
   
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    // Let the app keep running by returning an empty result.
      return of(result as T);
     };}
    }
