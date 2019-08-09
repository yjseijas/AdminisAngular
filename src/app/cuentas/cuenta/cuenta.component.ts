import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/shared/cuenta.service';
import { Cuenta } from 'src/app/shared/cuenta.model';
import { TiposCuentasService } from 'src/app/shared/tipos-cuentas.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  constructor(public service : CuentaService,
    public tipoCuentaService : TiposCuentasService,
    private noti : NotificationService,
    private dialogRef : MatDialogRef<CuentaComponent>) { }

  oCuenta : Cuenta;
    /*a = this.tipoCuentaService.tipoCuentaList;
  tiposCuentas = [
    {id : 1 , value :  'Tipo 1'},{id : 2 , value :  'Tipo 2'},{id : 3 , value :  'Tipo 3'}] ;*/
  
  ngOnInit() {
    this.service.getCuentas();
    this.tipoCuentaService.getTiposCuentas();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid)
    {
      this.oCuenta = new Cuenta() ;

      this.oCuenta = <Cuenta> this.service.form.value;
      this.insertRecord(this.oCuenta);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.noti.success(':: Registro Actualizado con éxito.');
      this.onClose(); 
    }
  }
  insertRecord(oCuenta: Cuenta) {
    this.service.postCuenta(oCuenta).subscribe(res => {
      this.service.lSalvo = true;
    });
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
