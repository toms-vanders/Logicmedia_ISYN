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
  private notes: Notes[] = [];

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:44371/api/note/';

  
  getNotes() {
    return this.http
      .get(this.url
      )
      .pipe(
        map(responseData => {
          this.notes = responseData as Notes[];
          console.log(this.notes)
          return this.notes;

        }),
    );
    
  }
 

  
  
    
}
