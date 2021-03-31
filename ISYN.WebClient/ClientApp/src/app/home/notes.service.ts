import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './Notes.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { CompleterItem, CompleterData } from 'ng2-completer';



@Injectable({
  providedIn:'root'
})

export class NotesService  {
  private notes: Notes[] = [];
  error = new Subject<string>();

  constructor(private http: HttpClient) {
      
  }

  private url = 'https://localhost:44371/api/note/';

  
  getNotes() {
    return this.http
      .get(this.url
      )
      .pipe(
        map(responseData => {
          this.notes = responseData as Notes[];
          console.log(JSON.stringify(this.notes))
          return this.notes;
        }),
    );
    
  }

  search(searchedTerm:string) {
    return this.http
      .get(this.url + searchedTerm
      )
      .pipe(
        map(responseData => {
          this.notes = responseData as Notes[];
          console.log(JSON.stringify(this.notes))
          return this.notes;
        }),
      );

  }

  
  
    
}
