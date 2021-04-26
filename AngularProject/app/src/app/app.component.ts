import { Component } from '@angular/core';
import { SearchService } from './shared/search.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    results: object;
    searchTerm$ = new Subject<string>();
    theTextArea = ''; 

    constructor(private searchService: SearchService) {
        searchService.search(this.searchTerm$).subscribe(
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

}
