import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './components/add-book/add-book.component';
import { GetBooksComponent } from './components/get-books/get-books.component';

import { BookmanagementRoutingModule } from './bookmanagement-routing.modul';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookmanagementRoutingModule,
    RouterModule
  ],
  declarations: [AddBookComponent,GetBooksComponent]
})
export class BookmanagementModule { }
