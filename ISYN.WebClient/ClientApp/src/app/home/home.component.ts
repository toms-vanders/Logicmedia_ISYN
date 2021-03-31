import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './notes.model';
import { NotesService } from './notes.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loadedNotes: Notes[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  searchedTerm: any;


  constructor( private notesService: NotesService) {

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
    //send http request
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



  







  
  
  




 

 



