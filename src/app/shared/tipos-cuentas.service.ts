import { Injectable } from '@angular/core';
import { TiposCuentas } from './tipos-cuentas.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposCuentasService {

  tipoCuentaList : TiposCuentas[];
  rootUrl : string;
  formData : TiposCuentas;

  constructor(private http: HttpClient) { }

//030619
  getTiposCuentas() {

    //this.rootUrl = "http://localhost:64705/api/TiposCuentasApi?idCompany=99";

    this.rootUrl = "http://54.94.191.184:1315/api/TiposCuentasApi?idCompany=99"; // 070619

    this.http.get(this.rootUrl)
    .toPromise().then(res => this.tipoCuentaList = res as TiposCuentas[]) ;
//    return this.http.get<TiposCuentas[]>(this.rootUrl);
}

}
