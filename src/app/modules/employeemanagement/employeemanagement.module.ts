import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeemanagementRoutingModule } from './employeemanagement-routing.module';

import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CreateEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeemanagementRoutingModule,
    RouterModule
  ]
})
export class EmployeemanagementModule { }
