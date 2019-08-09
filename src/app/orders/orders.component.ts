import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orderList;
  constructor(private service : OrderService,
    private router : Router,
    private noti : NotificationService,
    private dialogService : DialogService) { }

  ngOnInit() {
    this.refreshList();
  }

  runOrder(){
    this.router.navigateByUrl('/order');
  }

  openForEdit(orderId : number, orderNo: any,idProveedor : any,pMethod : any,gTotal : any,ordersId : any){
    this.service.orderNo = orderNo;
    this.service.idProveedor = idProveedor;
    this.service.pMethod = pMethod;
    this.service.gTotal = gTotal;
    this.service.ordersId = ordersId;

    this.router.navigateByUrl('/order/edit/' + orderId);
  }

  deleteOrder(id : number){
/*    if (confirm('Seguro de Borrar esta Orden de Compra?'))
    {
      this.service.deleteOrder(id).then(res => 
        {
          this.refreshList();
          this.noti.warning('Orden de Compra ha sido borrada...');
        });
    }*/

  //160719
    this.dialogService.openConfimDialog('Seguro de Borrar esta Orden de Compra?' )
      .afterClosed().subscribe(res => {
        if(!res)
        {
          return;
        }
        this.service.deleteOrder(id).then(res => 
          {
            this.refreshList();
            this.noti.warning('Orden de Compra ha sido borrada...');
          });
        }); 
  }

  refreshList(){
    this.service.getOrderList().then(res => this.orderList = res);
  }
}
