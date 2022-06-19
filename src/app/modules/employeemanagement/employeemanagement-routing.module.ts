import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';


const routes: Routes = [
  { path: "list", component: EmployeeListComponent },
  { path: "list/:employeeId", component: EmployeeListComponent },
  { path: "add", component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemanagementRoutingModule { }
