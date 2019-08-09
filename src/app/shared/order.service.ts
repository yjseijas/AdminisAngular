import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  rootUrl = '';
  formData : Order;
  orderItems : OrderItem[];

  orderNo;
  idProveedor;
  pMethod;
  gTotal;
  ordersId;
  orden : Order[];

  constructor(private http : HttpClient) { }

  addOrUpdate(){

    var body = {
        ...this.formData,
        OrdersItems : this.orderItems
    }

    this.rootUrl = 'http://54.94.191.184:1315/api/OrdersApi?idCompany=99';

    //this.rootUrl = 'http://localhost:64705/api/OrdersApi?idCompany=99';

    return this.http.post(this.rootUrl,body);
  }

  getOrderList(){

    this.rootUrl = 'http://54.94.191.184:1315/api/OrdersApi?idCompany=99';
    //this.rootUrl = 'http://localhost:64705/api/OrdersApi?idCompany=99';
  
      return this.http.get(this.rootUrl).toPromise(); 
    }

  getOrder(idOrder : number) : any{
    
      this.rootUrl = 'http://54.94.191.184:1315/api/OrdersApi?idOrder=' + idOrder + '&idCompany=99';
      //this.rootUrl = 'http://localhost:64705/api/OrdersApi?idOrder=' + idOrder + '&idCompany=99';
    
      return this.http.get(this.rootUrl).toPromise(); 
      }

  deleteOrder(idOrder : number){
    
    this.rootUrl = 'http://54.94.191.184:1315/api/OrdersApi/' + idOrder + '?idCompany=99';
        //this.rootUrl = 'http://localhost:64705/api/OrdersApi/' + idOrder + '?idCompany=99';
  
    return this.http.delete(this.rootUrl).toPromise(); 
        }
  
}
