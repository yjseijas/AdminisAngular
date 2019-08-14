import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemList : Item[];
  lSalvo = false;
  rootUrl = '';
  formItem : FormGroup = new FormGroup({
    $key : new FormControl(null), 
    name : new FormControl('',[Validators.required,Validators.minLength(10)]),
    price : new FormControl('',Validators.required),
    hireDate : new FormControl('',Validators.required),
    activo : new FormControl(false),
    itemId : new FormControl(0)
  });
  constructor(private http : HttpClient) { }

  getItemList(){

  //this.rootUrl = 'http://localhost:64705/api/ItemsApi?idCompany=99';

  this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi?idCompany=99';


    return this.http.get(this.rootUrl).toPromise(); 
  }

  initialiazeFormGroup() {
    this.formItem.setValue({
      $key : null, 
      name :'',
      price : '',
      hireDate : '',
      activo : false,
      itemId : 0  
    });
  }

  // YJS 140819
  getItems() :Observable<Item[]> {

  this.rootUrl = 'http://localhost:64705/api/ItemsApi?idCompany=99';

//  this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi?idCompany=99';

  return this.http.get<Item[]>(this.rootUrl);

  } 

  // YJS 140819
  postItem(form : Item) { 

  this.rootUrl = 'http://localhost:64705/api/itemsApi?idCompany=99';

//  this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi?idCompany=99'; 

   this.lSalvo = true;    
   return this.http.post(this.rootUrl,form);  
  }

  // YJS 140819
  deleteItem(idItem : any) {

    this.rootUrl = 'http://localhost:64705/api/ItemsApi/' + idItem + '?idCompany=99';

    this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi/' + idItem + '?idCompany=99'; 

    return this.http.delete(this.rootUrl);
  }

  populateForm(item: any) {
    this.formItem.setValue({
      $key: item.itemId,
      itemId : item.itemId,
      name : item.name,
      price : item.price,
      hireDate : item.hireDate,
      activo : item.activo
    }); 
   }
  
}
