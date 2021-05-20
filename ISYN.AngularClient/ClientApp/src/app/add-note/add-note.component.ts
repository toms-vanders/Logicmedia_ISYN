import { Component } from '@angular/core';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})

/** AddNote component*/
export class AddNoteComponent {

  loadedNotes: Note[] = [];
  showMsg = false;
  error = null;
  content: any;
  private errorSub: Subscription;
  note: Note;
  isFetching = false;
  /** AddNote ctor */
  constructor(private http: HttpClient, private noteService: NoteService) {

  }

  private url = 'https://localhost:44371/api/note/';

  showModal: boolean = false;
  title: any;
  //Bootstrap Modal Open event
  show() {
    this.showModal = true; // Show-Hide Modal Check

    this.title = "Add new note";    // Dynamic Data
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }


  addNote(noteData: Note) {

    this.noteService.postNotes(noteData.content).subscribe(note => {
      this.content = noteData.content;
    },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }


  /*addNote(content) {

    this.http.post(this.url, content).subscribe((content) => {
      console.warn("result", content)
    })
    console.warn(JSON.stringify(content));
    this.showMsg = true;
  }
*/


}


