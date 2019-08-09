import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/bill.service';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  facturasList;

  constructor(private service : BillService,
              private router : Router,
              private noti : NotificationService,
              private dialogService : DialogService
              ) { }

  ngOnInit() {
    this.refreshList();
  }
  refreshList(){
    this.service.getFacurasList().then(res => this.facturasList = res);
  }


  openForEdit(idBill : number, billNo: any,idCliente : any,pMethod : any,gTotal : any){
    this.service.idBill = idBill;
    this.service.idCliente = idCliente;
    this.service.pMethod = pMethod;
    this.service.gTotal = gTotal;
    this.service.billNo = billNo;

    this.router.navigateByUrl('/bill/edit/' + idBill);
  }
  runFactura(){
    this.router.navigateByUrl('/bill');
  }

  deleteFactura(id : number){
      //060819
        this.dialogService.openConfimDialog('Seguro de Borrar esta Factura?' )
          .afterClosed().subscribe(res => {
            if(!res)
            {
              return;
            }
            this.service.deleteFactura(id).then(res => 
              {
                this.refreshList();
                this.noti.warning('Factura ha sido borrada...');
              });
            }); 
      }
    
}
