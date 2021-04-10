import { Component } from '@angular/core';
import { Notes } from '../home/notes.model';
import { NotesService } from '../shared/notes.service';
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

  loadedNotes: Notes[] = [];
  msgTrue = false;
  error = null;
  content: any;
  private errorSub: Subscription;
  note: Notes;
  isFetching = false;
  /** AddNote ctor */
  constructor(private http: HttpClient) {

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

  
  addNote(data) {
    
    this.http.post(this.url, data).subscribe((result) => {
      console.warn("result",result)
    })
    console.warn(JSON.stringify(data));
  }

  
}

 
  

  /*
   addNote() {
    this.notesService.addNote(this.content).subscribe(notes => {
      this.loadedNotes = notes;
    },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

addNote() {
    this.notesService.addNote(this.note).subscribe(
      data => {
        console.log(data)
        this.refreshNotes();
      },
      error => {
      this.error = error.message;
      console.log(error);
    }
    );
  }

addNote(note: Notes): void {
    this.notesService.addNote(note).subscribe(
      () => {
        this.msgTrue = true;
        console.log(this.msgTrue);
        console.log(note);
      }
    );
  }*/



