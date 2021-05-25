import { Component } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-solution2',
  templateUrl: './solution2.component.html',
  styleUrls: ['./solution2.component.css']
})
export class Solution2Component {
  /** solution2 ctor */
  results: object;
  searchTerm$ = new Subject<string>();
  theTextArea = '';
  loadedNotes: Note[] = [];
  error = null;
  content: any;
  note: Note;
  isFetching = false;

  constructor(private noteService: NoteService) {
    noteService.searchNotes(this.searchTerm$).subscribe(
      results => { this.results = results; },
      error => { console.log(error.message); }
    );
  }



  private noteSelected(result: string) {
    console.log(result + " - was chosen");
    var text = "";
    text = this.theTextArea;
    text = text.split('@')[0] += result;
    this.results = null;
    this.theTextArea = text;

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

}

//this.noteService.postNotes(noteData.content.replace(/\s/g, "")).subscribe(note => {
