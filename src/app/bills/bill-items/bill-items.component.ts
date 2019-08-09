import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BillDetail } from 'src/app/shared/bill-detail.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { BillService } from 'src/app/shared/bill.service';

@Component({
  selector: 'app-bill-items',
  templateUrl: './bill-items.component.html',
  styleUrls: ['./bill-items.component.css']
})
export class BillItemsComponent implements OnInit {
  formData : BillDetail;
  itemList : Item[];
  isValid : boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<BillItemsComponent>,
    private itemService : ItemService,
    private billService : BillService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => {
      this.itemList = res as Item[]});

    if (this.data.billItemIndex == null)
    this.formData = {
      billDetailId : null,
      idBill : this.data.idBill,
      itemId : 0,
      itemName : '',
      Quantity : 0,
      Precio : 0,
      Total : 0
    } 
    else
    {
      this.formData = Object.assign({}, this.billService.facturaItems[this.data.billItemIndex ]);
    }
  }

  updatePrice(ctrl){
    if (ctrl.SelectedIndex == 0)
    {
      this.formData.Precio = 0;
      this.formData.itemName = '';
      return;
    }
    this.formData.Precio = this.itemList[ctrl.selectedIndex - 1].price;
    this.formData.itemName = this.itemList[ctrl.selectedIndex - 1].name;
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Precio).toFixed(2));
  }  

  onSubmit(form : NgForm)
  {
    if (this.validateForm(form.value))
    {
      if (this.data.billItemIndex == null)
      {
        this.billService.facturaItems.push(form.value);
      }
      else
      {
        this.billService.facturaItems[this.data.billItemIndex] = form.value;
      }      
      this.dialogRef.close();
    }
  } 

  validateForm(formData : BillDetail)
  {
    this.isValid = formData.itemId != 0 && formData.Quantity !=0;
    return this.isValid;
  }
}
