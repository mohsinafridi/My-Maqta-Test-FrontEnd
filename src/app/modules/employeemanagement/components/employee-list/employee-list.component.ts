import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any;
  isRecordFound: boolean = true;
  constructor(private employeeService: EmployeeService, private router: Router,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    return this.employeeService.getAllEmployees()
      .subscribe({
        next: (data) => {
          // if (data.body == null || data.body.length == 0) {
          //   this.isRecordFound = false;
          // }
          // debugger;
          this.employees = data.body;
        },
        error: error => {
          this.notifyService.showError("Error occur while getting Employee.");
        }
      });
  }

  onDeleteEmployee(request: number, email: string) {
    if (confirm("Are you sure to delete this user : " + email)) {
      this.employeeService.deleteEmployee(request)
        .subscribe({
          next: () => {
            this.notifyService.showSuccess('Employee deleted successfully.');
            this.getAllEmployees()
          },
          error: error => {
            this.notifyService.showError("Error occur while deleting Employee.");
          }
        });
    }
    else {
      return;
    }

  }

  navigateToCreate() {
    this.router.navigate(['/employee/add']);
  }
}
