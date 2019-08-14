import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  oItem : Item;
  constructor(private service : ItemService,
              private noti : NotificationService,
              public dialogRef : MatDialogRef<ItemComponent>) { }

  ngOnInit() {
    this.service.getItems();    
  }

  onClear()
  {
    this.service.formItem.reset()

    this.service.initialiazeFormGroup();
  }

//YJS 140819
  onSubmit() {
    if (this.service.formItem.valid)
    {
      this.oItem = new Item();
      this.oItem = <Item> this.service.formItem.value;
      this.insertRecord(this.oItem);
      this.service.formItem.reset();
      this.service.initialiazeFormGroup();
      this.noti.success('Registro Ingresado con Éxito.');
      this.onClose();
    }
  }

//YJS 140819  
  insertRecord(item: Item) {
    this.service.postItem(item).subscribe(res => {
      this.service.lSalvo = true;
    });
  }  

  onClose()
  {
    this.service.formItem.reset();
    this.service.initialiazeFormGroup();
    this.dialogRef.close();
  }
}
