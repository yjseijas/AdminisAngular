import { Injectable } from '@angular/core';

import {  FormGroup,FormControl, Validators} from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  clienteList : Cliente[];
  rootUrl : string = "";
  formData : Cliente;
  lSalvo : boolean = false;

  constructor(private http : HttpClient) { }

  form : FormGroup = new FormGroup({
    $key : new FormControl(null),
    idCliente : new FormControl(''),
    descripcion : new FormControl('', [Validators.required, Validators.minLength(10)]),
    email : new FormControl('', Validators.email),
    mobile : new FormControl('', [Validators.required, Validators.minLength(8)]),
    idCiudad : new FormControl(0),
    fechaAlta : new FormControl(''),
    activo : new FormControl(false)
  });

  inicializaForm() {
    this.form.setValue({
      $key : null,
      idCliente : '',
      descripcion : '',
      email : '',
      mobile : '',
      idCiudad : 0,
      fechaAlta : '',
      activo : false
  
    });
  }

//030619
getClientes() : Observable<Cliente[]>{

  //this.rootUrl =    "http://localhost:64705/api/ClientesApi?idCompany=99";
  this.rootUrl = "http://54.94.191.184:1315/api/ClientesApi?idCompany=99"; //300719
  
  return this.http.get<Cliente[]>(this.rootUrl);
}
getClienteList(){
    
  this.rootUrl = 'http://54.94.191.184:1315/api/ClientesApi?idCompany=99';
  //this.rootUrl =    'http://localhost:64705/api/ClientesApi?idCompany=99';

    return this.http.get(this.rootUrl).toPromise(); 
  }

postCliente(form : Cliente) {
  
  //this.rootUrl =    "http://localhost:64705/api/ClientesApi?idCompany=99";
  this.rootUrl = "http://54.94.191.184:1315/api/ClientesApi?idCompany=99";
  this.lSalvo = true;    

  return this.http.post(this.rootUrl,form);
}

deleteCliente(idCliente : any ){
  
  //this.rootUrl =    "http://localhost:64705/api/ClientesApi?idCliente=" + idCliente + "&idCompany=99";
  this.rootUrl = "http://54.94.191.184:1315/api/ClientesApi?idCliente=" + idCliente + "&idCompany=99";
  
  return this.http.delete(this.rootUrl);
}

populateForm(cliente: any) {

  this.form.setValue({
    $key: cliente.idCliente,
    idCliente : cliente.idCliente,
    descripcion : cliente.descripcion,
    email : cliente.email,
    mobile : cliente.mobile,
    idCiudad : cliente.idCiudad + '',
    fechaAlta : cliente.fechaAlta,
    activo : cliente.activo
  
  }); 
 }


}
