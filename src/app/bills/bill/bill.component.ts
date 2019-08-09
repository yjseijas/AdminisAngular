import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/shared/bill.service';
import { Cliente } from 'src/app/shared/cliente.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ClienteService } from 'src/app/shared/cliente.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BillItemsComponent } from '../bill-items/bill-items.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  clienteList : Cliente[];
  isValid : boolean = true;

  constructor(public service : BillService,
              private dialog: MatDialog,
              public clienteService : ClienteService,
              private noti : NotificationService,
              private router : Router,
              private currentRoute : ActivatedRoute) { }

  ngOnInit() {
    let facturaId = this.currentRoute.snapshot.paramMap.get('id');

    if (facturaId == null) 
    {
      this.resetForm();
    }
    else
    {
      this.service.getFactura(parseInt(facturaId)).then(res => {
        this.service.formData = res.bill;

        this.service.formData.idBill = this.service.idBill;
        this.service.formData.billNo = this.service.billNo;
        this.service.formData.idCliente = this.service.idCliente;
        this.service.formData.gTotal = this.service.gTotal;
        this.service.formData.pMethod = this.service.pMethod;
        this.service.formData.fechaCorta = this.service.fechaCorta;
        this.service.facturaItems = res.detail;
      })
    }
    this.clienteService.getClienteList().then(res => this.clienteList = res as Cliente[])
  }
  resetForm(form? : NgForm){
    if (form = null)
      form.resetForm();
      let todayDate = new Date();
      let cDia = todayDate.getDate() + '';
      cDia = cDia.padStart(2,'0');

/*      let cMes = todayDate.getMonth() + 1 + '';
      cMes = cMes.padStart(2,'0');*/

      let nMes = todayDate.getMonth();
      let cMes = nMes == 0 ? 'Ene' :
             nMes == 1 ? 'Feb' :
             nMes == 2 ? 'Mar' :
             nMes == 3 ? 'Abr' :
             nMes == 4 ? 'May' :
             nMes == 5 ? 'Jun' :
             nMes == 6 ? 'Jul' :
             nMes == 7 ? 'Ago' :
             nMes == 8 ? 'Sep' :
             nMes == 9 ? 'Oct' :
             nMes == 10 ? 'Nov' : 'Dic';

      let cHour = todayDate.getHours() + '';
      cHour = cHour.padStart(2,'0');
      let cMinute = todayDate.getMinutes() + '';
      cMinute = cMinute.padStart(2,'0');
      let cSecond = todayDate.getSeconds() + '';
      cSecond = cSecond.padStart(2,'0');

      let dateToday = cDia + '/' + cMes + 
      '/' + todayDate.getFullYear()
      + ' ' + cHour + ':' + cMinute + ':' + cSecond;
      
    this.service.formData = {
      idBill : null,
      billNo : Math.floor(100000 + Math.random() * 900000).toString(),
      idCliente : 0,
      pMethod : '',
      gTotal : 0,
      nombreCliente : '',
      fechaCorta : dateToday //Date().toString()
    };
    this.service.facturaItems = [];
  }

  addOrEdit(billItemIndex,idBill){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {billItemIndex,idBill}
    this.dialog.open(BillItemsComponent,dialogConfig).afterClosed().subscribe(res => {
      this.updateTotal(); 
    }) ;
  }

  updateTotal(){
    this.service.formData.gTotal =  this.service.facturaItems.reduce((prev,curr) => {
      return prev + curr.Total;
    },0)

    
    this.service.formData.gTotal = parseFloat(this.service.formData.gTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = (this.service.formData.idCliente != 0) && (this.service.facturaItems.length > 0);
    return this.isValid;
  }

  onDelete(billDetailId : number, index : number)
  {
    this.service.facturaItems.splice(index,1);
    this.updateTotal();
  }

  onSubmit(form : NgForm)
  {
    if (this.validateForm())
    {
      let cMensaje = this.service.formData.idBill == null ? 'Agregada.' : 'Actualizada.';
      this.service.addOrUpdate().subscribe(res => {
        this.resetForm();
        this.noti.success('La factura ha sido ' + cMensaje);  
      });
    }
  }

  viewFacturas(){
    this.router.navigateByUrl('/bills');
  }

}
