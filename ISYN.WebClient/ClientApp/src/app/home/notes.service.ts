import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './Notes.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn:'root'
})

export class NotesService {

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get('https://localhost:44371/api/note/')
      .pipe
      (map((responseData: { [content: string]: Notes }) => {
        const notesArray: Notes[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            notesArray.push({ ...responseData[key], id: key })
          }
        }
        return notesArray;
      })
      );
      
  }
  
    
}
