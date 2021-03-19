import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './notes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loadedNotes: Notes[] = [];


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getNotes();
  }

  onGetNotes() {
    this.getNotes();
  }

  private getNotes() {
    this.http.get('https://localhost:44371/api/note/')
      .pipe
      (map((responseData: { [content: string]: Notes }) => {
        const notesArray:Notes[] = [];
        for (const content in responseData) {
          if (responseData.hasOwnProperty(content)) {
            notesArray.push({ ...responseData[content], id: content })
          }
          
        }
        return notesArray;
      })
      )
      .subscribe(notes => {
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







  
  
  




 

 



