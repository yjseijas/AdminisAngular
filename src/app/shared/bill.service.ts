import { Injectable } from '@angular/core';
import { Bill } from './bill.model';
import { HttpClient } from '@angular/common/http';
import { BillDetail } from './bill-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//yjs 020819
export class BillService {
  facturaItems :BillDetail[];
  billList : Bill[];
  rootUrl = '';
  idBill : number;
  billNo :  string;
  idCliente : number;
  pMethod : string;
  gTotal : number;
  fechaCorta : string;

  formData : Bill;
  constructor( private http : HttpClient) { }

  getFacurasList(){

    this.rootUrl = 'http://54.94.191.184:1315/api/BillsApi?idCompany=99';
    //this.rootUrl =    'http://localhost:64705/api/BillsApi?idCompany=99';
  
      return this.http.get(this.rootUrl).toPromise(); 
    }

    getFactura(idFactura : number) : any{
    
      this.rootUrl = 'http://54.94.191.184:1315/api/BillsApi?idBill=' + idFactura + '&idCompany=99';
      //this.rootUrl =    'http://localhost:64705/api/BillsApi?idBill=' + idFactura + '&idCompany=99';
    
      return this.http.get(this.rootUrl).toPromise(); 
    }    

    getFacturas() : Observable<Bill[]>{

    this.rootUrl = 'http://54.94.191.184:1315/api/BillsApi?idCompany=99';
    //this.rootUrl =    'http://localhost:64705/api/BillsApi?idCompany=99';
      
      return this.http.get<Bill[]>(this.rootUrl);
    }
    

    addOrUpdate()// 050819  yjs
    {
        var body = {
          ...this.formData,
          billItems : this.facturaItems
        }        
        this.rootUrl = 'http://54.94.191.184:1315/api/BillsApi?idCompany=99';
        //   this.rootUrl = 'http://localhost:64705/api/BillsApi?idCompany=99';

        return this.http.post(this.rootUrl,body);
    }
      deleteFactura(idFactura : number){
    
      this.rootUrl = 'http://54.94.191.184:1315/api/BilssApi?idBill=' + idFactura + '&idCompany=99';
      //this.rootUrl =    'http://localhost:64705/api/BillsApi?idBill=' + idFactura + '&idCompany=99';
      
        return this.http.delete(this.rootUrl).toPromise(); 
      }
    
}
