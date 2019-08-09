import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {
  rootUrl = '';

  constructor(private http : HttpClient) { }

  getProvedorList(){
    
    this.rootUrl = 'http://54.94.191.184:1315/api/ProvedorApi?idCompany=99';
    //this.rootUrl = 'http://localhost:64705/api/ProvedorApi?idCompany=99';
  
      return this.http.get(this.rootUrl).toPromise(); 
    }
  
}
