import { Injectable } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList : Employee[];
  rootUrl = '';
  formData : Employee;
  lSalvo : boolean = false;
  constructor(private http : HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    mobile: new FormControl('',[Validators.required,Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('0'),
    department: new FormControl('0'),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false),
    idEmployee : new FormControl(0)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName : '',
      email : '',
      mobile : '',
      city : '',
      gender : '0',
      department : '0',
      hireDate : '',
      isPermanent : false,
      idEmployee : 0
    });
  }

  getEmployees() :Observable<Employee[]> {

    //GET api/EmployeeApi?idCompany={idCompany}   antes => 'http://localhost:50779/api/Employee?idCompany=99'

//  this.rootUrl = 'http://localhost:64705/api/EmployeeApi?idCompany=99';

  this.rootUrl = 'http://54.94.191.184:1315/api/EmployeeApi?idCompany=99'; // 070619


  // this.http.get(this.rootUrl).toPromise().then(res => this.employeeList = res as Employee[]);
  
  return this.http.get<Employee[]>(this.rootUrl);

  /*    
    getFleetData(): Observable<User[]> {
      return this.http.get<User[]>(this.serviceUrl);    */

  } 

 postEmployee(form : Employee) { 

//    alert(form); api/EmployeeApi?idCompany={idCompany} antes ->'http://localhost:50779/api/Employee?idCompany=99'
    
  //  alert('Aqui es el guardar: ' + form.idEmployee + '-' +  form.fullName + form.city + ' - ' + form.mobile)

//  this.rootUrl = 'http://localhost:64705/api/EmployeeApi?idCompany=99';

  this.rootUrl = 'http://54.94.191.184:1315/api/EmployeeApi?idCompany=99'; //070619
  this.lSalvo = true;    
//  this.employeeList.push(new Employee[{ 'idEmployee' : form.idEmployee}] );
  //  alert(form.fullName);
    return this.http.post(this.rootUrl,form);  
  }

  //300519   api/EmployeeApi?idEmployee={idEmployee}&idCompany={idCompany} antes => 'http://localhost:50779/api/Employee?idEmp=' + idEmp + '&idComp=99'

  deleteEmployee(idEmp : any) {

//    this.rootUrl = 'http://localhost:64705/api/EmployeeApi?idEmployee=' + idEmp + '&idCompany=99';

    this.rootUrl = 'http://54.94.191.184:1315/api/EmployeeApi?idEmployee=' + idEmp + '&idCompany=99'; // 070619

    return this.http.delete(this.rootUrl);
  }

  populateForm(emp: any) {
//alert(emp); 
//alert('Id Employee Services Populateform: ' + emp.idEmployee);
//alert('Id department Services Populateform: ' + typeof emp.department);
//alert('Id gender Services Populateform: ' + typeof emp.gender);
//    this.form.setValue(emp);

    
  this.form.setValue({
    $key: emp.idEmployee,
    fullName : emp.fullName,
    email : emp.email,
    mobile : emp.mobile,
    city : emp.city,
    gender : emp.gender + '',
    department : emp.department + '',
    hireDate : emp.hireDate,
    isPermanent : emp.isPermanent,
    idEmployee : emp.idEmployee
  });


  }
}
