import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RegexpPattern, PhoneNumberLength } from 'src/app/modules/shared/constant/constants';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from './../../models/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  id: number;
  isAddMode: boolean;
  EmployeeAddOrUpdate: string = "Create Employee";
  submitted = false;
  subscription: Subscription | undefined;
  CreateEmployeeForm: FormGroup;


  constructor(private fb: FormBuilder, private utilityService: UtilityService,
    private employeeService: EmployeeService, private notifyService: NotificationService,
    private route: ActivatedRoute, private router: Router
  ) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.EmployeeAddOrUpdate = "Update Employee"
      this.employeeService.getEmployeeById(this.id)
        .subscribe(
          result => {
            this.CreateEmployeeForm.patchValue({
              Firstname: result.firstName,
              Lastname: result.lastName,
              Email: result.email,
              Phone: result.phone
            });

          });
    }

    this.CreateEmployeeForm = this.fb.group({
      Email: [
        "",
        [
          Validators.email,
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@([\w-]+\.)+[\w-]{2,}$/g),
          Validators.maxLength(256),
        ],
      ],
      Firstname: [
        "",
        [
          Validators.required,
          Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
        ],
      ],
      Lastname: [
        "",
        [
          Validators.required,
          Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
        ],
      ],
      Phone: ["", [
        Validators.required,
        // Validators.minLength(PhoneNumberLength.length),
        // Validators.maxLength(PhoneNumberLength.length),
      ],
      ]

    });
  }

  onAddEmployee() {
    this.submitted = true;
    // if (this.CreateEmployeeForm.invalid) {
    //   return;
    // }

    const createEmployee = this.CreateEmployeeForm.value;
    let model: Employee = {
      Id: 0,
      FirstName: createEmployee.Firstname,
      LastName: createEmployee.Lastname,
      Email: this.utilityService.toLowerCase(createEmployee.Email),
      Phone: createEmployee.Phone
    };

    if (this.isAddMode) {
      this.addEmployee(model);
    } else {
      model.Id = this.id;
      this.updateEmployee(model);
    }
  }

  addEmployee(request: Employee) {
    this.employeeService.addEmployee(request)
      .subscribe({
        next: () => {
          this.notifyService.showSuccess('Employee saved successfully.');
          this.router.navigate(['/employee/list']);
        },
        error: error => {
          this.notifyService.showError("Error occur while saving Employee.");
        }
      });
  }


  updateEmployee(request: Employee) {
    this.employeeService.updateEmployee(request)
      .subscribe({
        next: (data) => {
          this.notifyService.showSuccess('Employee updated successfully.');
          this.router.navigate(['/employee/list']);
        },
        error: error => {
          this.notifyService.showError("Error occur while updating Employee.");
        }
      });
  }





  formReset() {
    this.CreateEmployeeForm.reset();
    this.submitted = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.CreateEmployeeForm.controls;
  }

  navigateBack() {
    this.router.navigate(['/employee/list']);
  }
}

