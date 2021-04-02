import { Component } from '@angular/core';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.css']
})
/** AddNote component*/
export class AddNoteComponent {
    /** AddNote ctor */
    constructor() {

  }

  showModal: boolean = false;
  content: any;
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
}
