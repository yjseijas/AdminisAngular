import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : Users;
  rootUrl : string;
  formData : Users;

  constructor(private http : HttpClient) { }

  getUsers(nomuser : string):Observable<Users> 
  {
  //this.rootUrl = "http://localhost:64705/api/UsuariosApi?idCompany=99";

    this.rootUrl = "http://54.94.191.184:1315/api/UsuariosApi?nomUser=" + nomuser + "&idCompany=99"; // 110619
//    alert('antes http get: ' + this.rootUrl);
    
    
    /*this.http.get(this.rootUrl)
      .toPromise().then(res => this.user = res as Users) ;*/
      
      return this.http.get<Users>(this.rootUrl);
  }
}
