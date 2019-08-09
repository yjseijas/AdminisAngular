import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  formData : OrderItem;
  itemList : Item[];
  isValid : boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<OrderItemsComponent>,
    private itemService : ItemService,
    private orderServices : OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);

    if (this.data.orderItemIndex == null)
    {
      this.formData = {
        ordersDetailId : null,
        ordersId : this.data.ordersId,
        itemId : 0,
        itemName : '',
        Precio : 0,
        Quantity : 0,
        Total : 0
      }
    } 
    else
    {
      this.formData = Object.assign({}, this.orderServices.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl) {
    this.formData.Precio = ctrl.selectedIndex == 0 ? 0 : this.itemList[ctrl.selectedIndex - 1].price; 
    this.formData.itemName = ctrl.selectedIndex == 0 ? '' : this.itemList[ctrl.selectedIndex - 1].name; 
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Precio).toFixed(2));
  }

  onSubmit(form : NgForm){
    if (!this.validateForm(form.value))
      return;

    if (this.data.orderItemIndex == null)  
      this.orderServices.orderItems.push(form.value);
    else
      this.orderServices.orderItems[this.data.orderItemIndex] = form.value;

    this.dialogRef.close();
  }

  validateForm(formData : OrderItem){
    this.isValid = (formData.itemId != 0 && formData.Quantity != 0 );
    return this.isValid;
  }
}
