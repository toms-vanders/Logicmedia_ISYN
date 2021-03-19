import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './notes.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loadedNotes: Notes[] = [];
  isFetching = false;


  constructor(private http: HttpClient, private notesService: NotesService) {

  }

  ngOnInit() {
    this.isFetching = true;
    this.notesService.getNotes().subscribe(notes => {
      this.isFetching = false;
      this.loadedNotes = notes;
    });
  }

  onGetNotes() {
    this.isFetching = true;
    this.notesService.getNotes().subscribe(notes => {
      this.isFetching = false;
      this.loadedNotes = notes;
    });
  }

  
}



  /*
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Notes[]>(baseUrl + 'notes').subscribe(result => {
      this.notes = result;
    }, error => console.error(error));
  }
  

  ngOnInit(): void {
    this.getNotes;

  }

  getNotes() {
    this.http.get<any>('https://localhost:44371/GetAllNotes').subscribe(
      response => {
        console.log(response);
        this.notes = response;
      });

  }

notes: Notes[]=[];


  constructor(private rs: NoteService) {

  }

  ngOnInit(): void {
    this.getNotes;

  }

  getNotes() {
    this.rs.getNotes().subscribe(
      response => {
        console.log(response);
        this.notes = response;
      });
  }
  */







  
  
  




 

 



