import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-solution1',
  templateUrl: './solution1.component.html',
  styleUrls: ['./solution1.component.css']


})
export class Solution1Component implements OnInit {
  loadedNotes: Note[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  searchedTerm: any;


  constructor(private notesService: NoteService) {

  }

  ngOnInit() {
    
    this.errorSub = this.notesService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.notesService.getNotes().subscribe(notes => {
      this.isFetching = false;
      this.loadedNotes = notes;
    },
      error => {
        this.error = error.message;
      }
    );
    




  }

  

  onGetNotes() {
    this.isFetching = true;
    this.notesService.getNotes().subscribe(notes => {
      this.isFetching = false;
      this.loadedNotes = notes;


    },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  search() {
    this.isFetching = true;
    this.notesService.search(this.searchedTerm).subscribe(notes => {
      this.isFetching = false;
      this.loadedNotes = notes;
    },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }
  


}












