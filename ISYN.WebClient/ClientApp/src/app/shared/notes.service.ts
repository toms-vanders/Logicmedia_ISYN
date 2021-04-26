import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from '../home/Notes.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';




@Injectable({
  providedIn:'root'
})

export class NotesService implements OnInit {
  private notes: Notes[] = [];
  error = new Subject<string>();

  constructor(private http: HttpClient) {
      
  }


  private url = 'https://localhost:44371/api/note/';

  ngOnInit() {
    
  }

  

  //getting the notes from API
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

  //searching the notes in the API
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
