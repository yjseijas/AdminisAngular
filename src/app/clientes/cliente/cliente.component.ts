import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/cliente.service';
import { Cliente } from 'src/app/shared/cliente.model';
import { CiudadService } from 'src/app/shared/ciudad.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

// yjs 29 300719
export class ClienteComponent implements OnInit {

  constructor(public service : ClienteService,
              public ciudadService : CiudadService,
              private noti : NotificationService,
              public dialogRef: MatDialogRef<ClienteComponent>) { }

  /*idCiudad =  [
    {id : 1,value : 'City 01'},
    {id : 2,value : 'City 02'},
    {id : 3,value : 'City 03'}
  ]*/

  oCliente : Cliente;

  ngOnInit() {
    this.service.getClientes();
    this.ciudadService.getCiudades();
  }

  onClear() {
    this.service.form.reset();
    this.service.inicializaForm();
  }

  onSubmit() {
    if (this.service.form.valid)
    {
      this.oCliente = new Cliente();
      this.oCliente = <Cliente> this.service.form.value;
   //   var lact = this.oCliente.activo;
      this.isertCliente(this.oCliente);

      this.service.form.reset();
      this.service.inicializaForm();
      this.noti.success('Registro Ingresado con Éxito.');
      this.onClose();
    }
  }
  isertCliente(oCliente: Cliente) {
    //alert(oCliente.idCliente);
    //let lUpdate = oCliente.idCliente != 0;
    //alert(lUpdate);
    this.service.postCliente(oCliente).subscribe(res => {
      this.service.lSalvo = true;
    });
  }
  onClose(){
    this.service.form.reset();
    this.service.inicializaForm();
    this.dialogRef.close();
  }

}
