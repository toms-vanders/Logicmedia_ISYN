import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './Notes.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';


@Injectable({
  providedIn:'root'
})

export class NotesService {
  error = new Subject<string>();
    JSON: any;


  constructor(private http: HttpClient) {}

  
  getNotes() {
    return this.http
      .get<{ [key: string]: Notes }>(
        'https://localhost:44371/api/note/'
      )
      .pipe(
        map(responseData => {
          const notesArray: Notes[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              notesArray.push({ ...responseData[key], content: key });
            }
          }
          return notesArray;
          
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
    );
    
  }
  
    
}
