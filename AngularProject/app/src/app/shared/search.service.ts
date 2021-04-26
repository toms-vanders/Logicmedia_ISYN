import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Note } from '../models/Note';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private notes: Note[] = [];

    constructor(private http: HttpClient) {}

    private url = 'https://localhost:44371/api/note/';

    search(terms: Observable<string>): any {
        var specialSymbolPosition;
        return terms.pipe(
            // debounceTime(400): waits until there’s no new data for the provided amount of time
            debounceTime(400),
            // distinctUntilChanged():
            //      will ensure that only distinct data passes through
            //      will only send the data once
            distinctUntilChanged(),
            filter((term:string) => {
              specialSymbolPosition = term.indexOf('@');
              if (specialSymbolPosition > -1)
              {
                term = term.slice(specialSymbolPosition);
                if (term.length > 2)
                {
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
}
