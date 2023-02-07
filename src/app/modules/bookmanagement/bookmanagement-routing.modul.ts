import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBookComponent } from './components/add-book/add-book.component';
import { GetBooksComponent } from './components/get-books/get-books.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: GetBooksComponent },
  { path: 'list/:id', component: GetBooksComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: AddBookComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmanagementRoutingModule {}
