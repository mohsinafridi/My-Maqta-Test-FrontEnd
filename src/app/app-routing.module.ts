import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employee'
  },
  {
    path: "employee",
    loadChildren: () => import("./modules/employeemanagement/employeemanagement.module")
      .then(m => m.EmployeemanagementModule),
  },

  {
    path: "product",
    loadChildren: () => import("./modules/productmanagement/productmanagement.module")
      .then(m => m.ProductmanagementModule)
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
