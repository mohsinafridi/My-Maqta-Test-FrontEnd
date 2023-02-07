import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employeemanagement/employeemanagement.module').then(
        (m) => m.EmployeemanagementModule
      ),
  },

  {
    path: 'product',
    loadChildren: () =>
      import('./modules/productmanagement/productmanagement.module').then(
        (m) => m.ProductmanagementModule
      ),
  },
  {
    path: 'book',
    loadChildren: () =>
      import('./modules/bookmanagement/bookmanagement.module').then(
        (m) => m.BookmanagementModule
      ),
  },
  {
    path: 'note',
    loadChildren: () =>
      import('./modules/notesmanagement/notemanagement.module').then(
        (m) => m.NotemanagementModule
      ),
  },
  { path: 'login', component: LoginComponent },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
