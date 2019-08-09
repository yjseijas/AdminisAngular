import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Cuenta } from './cuenta.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  cuentaList : Cuenta[];
  rootUrl : string;
  formData : Cuenta;
  lSalvo : boolean = false;

  constructor(private http: HttpClient) { }

  form : FormGroup = new FormGroup({
    $key : new FormControl(null),
    idCuenta : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("^[0-9]*$")]),
    descripcion : new FormControl('',[Validators.required,Validators.minLength(5)]),
    recibeasientos : new FormControl(''),
    ajustable : new FormControl(''),
    activo : new FormControl(''),
    idTipoCuenta : new FormControl('1')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key : null,
      idCuenta : 0,
      descripcion : '', 
      recibeasientos : '',
      ajustable : '',
      activo : '' ,
      idTipoCuenta :  '1'
    });
  } 

  //030619
  getCuentas() : Observable<Cuenta[]>{

    //this.rootUrl = "http://localhost:64705/api/CuentasApi?idCompany=99";

    this.rootUrl = "http://54.94.191.184:1315/api/CuentasApi?idCompany=99"; //070619
    
    return this.http.get<Cuenta[]>(this.rootUrl);
  }

  postCuenta(form : Cuenta) {

    //this.rootUrl = "http://localhost:64705/api/CuentasApi?idCompany=99";

    this.rootUrl = "http://54.94.191.184:1315/api/CuentasApi?idCompany=99";
    this.lSalvo = true;    

    return this.http.post(this.rootUrl,form);
  }

  deleteCuenta(idCuenta : any ){
    
    //this.rootUrl = "http://localhost:64705/api/CuentasApi?idCuenta=" + idCuenta + "&idCompany=99";

    this.rootUrl = "http://54.94.191.184:1315/api/CuentasApi?idCuenta=" + idCuenta + "&idCompany=99";
    
    return this.http.delete(this.rootUrl);
  }

  populateForm(cuenta: any) {
    this.form.setValue({
      $key: cuenta.idCuenta,
      idCuenta : cuenta.idCuenta,
      descripcion : cuenta.descripcion,
      recibeasientos : cuenta.recibeasientos,
      ajustable : cuenta.ajustable,
      activo : cuenta.activo,
      idTipoCuenta : cuenta.idTipoCuenta + ''
      
    }); 
   }

}