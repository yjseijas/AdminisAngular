import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  rootUrl = '';
  formItem : FormGroup = new FormGroup({
    $key : new FormControl(null), 
    name : new FormControl('',[Validators.required,Validators.minLength(10)]),
    price : new FormControl('',Validators.required),
    hireDate : new FormControl('',Validators.required),
    activo : new FormControl(false)  
  });
  constructor(private http : HttpClient) { }

  getItemList(){

  //this.rootUrl = 'http://localhost:64705/api/ItemsApi?idCompany=99';

  this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi?idCompany=99';


    return this.http.get(this.rootUrl).toPromise(); 
  }

  initialiazeFormGroup() {
    this.formItem.setValue({
      $key : null, 
      name :'',
      price : '',
      hireDate : '',
      activo : false  
    });
  }

}
