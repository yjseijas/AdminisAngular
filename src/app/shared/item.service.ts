import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  rootUrl = '';

  constructor(private http : HttpClient) { }

  getItemList(){

  //this.rootUrl = 'http://localhost:64705/api/ItemsApi?idCompany=99';

  this.rootUrl = 'http://54.94.191.184:1315/api/ItemsApi?idCompany=99';


    return this.http.get(this.rootUrl).toPromise(); 
  }
}
