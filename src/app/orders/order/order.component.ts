import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { ProvedorService } from 'src/app/shared/provedor.service';
import { Provedor } from 'src/app/shared/provedor.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  provedorList : Provedor[];
  isValid : boolean =  true;
  
  constructor(public service : OrderService,
    private dialog : MatDialog,
    private provedorService : ProvedorService,
    private noti : NotificationService,
    private router : Router,
    private currentRoute : ActivatedRoute) { }

  ngOnInit() {
    let orderId = this.currentRoute.snapshot.paramMap.get('id');

    if (orderId == null)
    {
      this.resetForm();
    }
    else
    {

      this.service.getOrder(parseInt(orderId)).then(res => {

        //const borra = JSON.stringify(this.service.formData);
        //alert(borra);


        this.service.formData =  res.orden;

        //const borra2 = JSON.stringify(this.service.formData);
        //alert(borra2);

        this.service.formData.orderNo = this.service.orderNo;
        this.service.formData.idProveedor = this.service.idProveedor;
        this.service.formData.pMethod = this.service.pMethod;
        this.service.formData.gTotal = this.service.gTotal;
        this.service.formData.ordersId = this.service.ordersId;

        this.service.orderItems = res.detail;  
      });
      
    }

    this.provedorService.getProvedorList().then(res => this.provedorList = res as Provedor[]);
    return;
  }

  resetForm(form? : NgForm){
    if (form = null)
      form.resetForm();
      
    this.service.formData = {
      ordersId : null,
      orderNo : Math.floor(100000 + Math.random() * 900000).toString(),
      idProveedor : 0,
      pMethod : '',
      gTotal : 0,
      nombreProvedor : ''
    };
    this.service.orderItems = [];
  }

  addOrEdit(orderItemIndex,OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex,OrderID}
    this.dialog.open(OrderItemsComponent,dialogConfig).afterClosed().subscribe(res => {
      this.updateTotal(); 
    }) ;
  }

  onDelete(orderItemId : number, index : number){
    
    if (orderItemId != null)  
    //  this.service.formData.DeletedOrderItemIDs += orderItemId + ',';
     this.service.orderItems.splice(index,1);

    this.updateTotal(); 

  }

  updateTotal(){
    this.service.formData.gTotal =  this.service.orderItems.reduce((prev,curr) => {
      return prev + curr.Total;
    },0)

    this.service.formData.gTotal = parseFloat(this.service.formData.gTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = (this.service.formData.idProveedor != 0) && (this.service.orderItems.length > 0);
    return this.isValid;
  }

  onSubmit(form : NgForm){
    let isNew = this.service.ordersId == 0;
    if (this.validateForm())
    {
      this.service.addOrUpdate().subscribe(res => {
        this.resetForm();
        if (isNew) 
          this.noti.success('Orden de Compra ha sido agregada.');
        else 
          this.noti.warning('Orden de Compra ha sido modificada.'); 

        this.router.navigateByUrl('/orders');
      });      
    }
  }

  viewOrders(){
    this.router.navigateByUrl('/orders');
  }
}
