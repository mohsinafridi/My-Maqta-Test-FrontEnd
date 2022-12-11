import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NoteListComponent } from './components/note-list/note-list.component';

// import { ProductResolveService } from './services/product-resolve.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: NoteListComponent,
    // resolve: { products: ProductResolveService },
  },
  {
    path: 'add',
    component: AddNoteComponent,
  },
  { path: 'edit/:id', component: AddNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotemanagementRoutingModule {}
