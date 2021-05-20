import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/note.model';
import { map, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})

export class NoteService implements OnInit  {
  private notes: Note[] = [];
  error = new Subject<string>();

  constructor(private http: HttpClient) {

  }


  private url = 'https://localhost:44371/api/note/';


  ngOnInit(){

}


  //getting the notes from API 
  getNotes() {
    return this.http
      .get(this.url
      )
      .pipe(
        map(responseData => {
          this.notes = responseData as Note[];
          console.log(JSON.stringify(this.notes))
          return this.notes;
        }),
      );

  }

  //SOLUTION 1: searching the notes in the API 
  search(searchedTerm: string) {
    return this.http
      .get(this.url + searchedTerm
      )
      .pipe(
        map(responseData => {
          this.notes = responseData as Note[];
          console.log(JSON.stringify(this.notes))
          return this.notes;
        }),
      );
  }

  //SOLUTION 2

  searchNotes(terms: Observable<string>): any {
    var specialSymbolPosition;
    return terms.pipe(
      // debounceTime(400): waits until there’s no new data for the provided amount of time
      debounceTime(400),
      // distinctUntilChanged():
      //      will ensure that only distinct data passes through
      //      will only send the data once
      distinctUntilChanged(),
      filter((term: string) => {
        specialSymbolPosition = term.indexOf('@');
        if (specialSymbolPosition > -1) {
          term = term.slice(specialSymbolPosition);
          if (term.length > 2) {
            console.log('good:' + term);
            return true
          }
        }
        console.log('bad:' + term);
        return false;
      }),
      // switchMap():
      //      combines multiple possible observables received from the searchEntries method into one,
      //      which ensures that we use the results from the latest request only.
      switchMap((term: string) => this.searchEntries(term.slice(specialSymbolPosition + 1)))
    );
  }

  // searchEntries(term): makes a get request to our API endpoint with our search term, this gives us another observable
  searchEntries(term: string): Observable<object> {
    console.log('searching for:' + term);
    // Create the request url with search term in the query params
    var address = `${this.url}${term}`;
    return this.http.get(address).pipe(
      map(responseData => {
        this.notes = responseData as Note[];
        //console.log(responseData);
        //console.log(JSON.stringify(this.notes))
        return this.notes;
      }),
    );
  }

  

  postNotes(content: string) {
    const noteData: Note = {content:content}
    return this.http
      .post(this.url, noteData)
      .pipe(
        map(noteData => {
          console.log(JSON.stringify(noteData))
        }),
      );
  }

}
