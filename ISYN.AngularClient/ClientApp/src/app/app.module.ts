import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2CompleterModule } from 'ng2-completer';
import { Ng2OrderModule } from 'ng2-order-pipe';






import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AuthorsComponent } from './authors/authors.component';
import { Solution1Component } from './solution1/solution1.component';
import { Solution2Component } from './solution2/solution2.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AddNoteComponent,
    AuthorsComponent,
    Solution1Component,
    Solution2Component
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2CompleterModule,
    Ng2OrderModule,
    RouterModule.forRoot([
      { path: '', component: Solution2Component, pathMatch: 'full' },
      { path: 'solution1', component: Solution1Component },
      { path: 'authors', component: AuthorsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
