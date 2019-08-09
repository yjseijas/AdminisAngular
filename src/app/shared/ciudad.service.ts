import { Injectable } from '@angular/core';
import { Ciudad } from './ciudad.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  ciudadList : Ciudad[];
  rootUrl : string;
  formData : Ciudad;

  constructor(private http : HttpClient) { }

  
//300719
getCiudades() {

  //this.rootUrl =    "http://localhost:64705/api/CiudadesApi?idCompany=99";
  this.rootUrl = "http://54.94.191.184:1315/api/CiudadesApi?idCompany=99"; // 300719

  this.http.get(this.rootUrl)
  .toPromise().then(res => this.ciudadList = res as Ciudad[]) ;

  }
}
