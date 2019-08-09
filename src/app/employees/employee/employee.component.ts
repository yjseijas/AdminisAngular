import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import {NotificationService} from '../../shared/notification.service';
import {MatDialogRef} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit {

  constructor(public service : EmployeeService,
    private noti : NotificationService,
    public dialogRef : MatDialogRef<EmployeeComponent>) { }

  oEmployee : Employee;

  departments = [
    {id:1, value :'Dep 1'},
    {id:2, value :'Dep 2'},
    {id:3, value :'Dep 3'},
  ]

  ngOnInit() {
    this.service.getEmployees(); 
  }

  onClear() {
    this.service.form.reset();

    this.service.initializeFormGroup();

  }

  onSubmit() {
    if (this.service.form.valid)
    {
      this.oEmployee = new Employee();
      //oEmployee = this.service.form.value;
      
      this.oEmployee = <Employee>  this.service.form.value;

      //this.service.postEmployee(this.oEmployee); 
      this.insertRecord(this.oEmployee); 
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.noti.success(':: Registro Actualizado con éxito.');
      this.onClose(); 
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  insertRecord(emp: Employee) {

    this.service.postEmployee(emp).subscribe();
  }  
}
