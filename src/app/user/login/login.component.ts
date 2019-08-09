import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Users } from 'src/app/shared/users.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datos : any;

  cNomUser : string;
  cPassword : string;
  cPasswordIntro: string;
  
  formModel = {
    nombre : '',
    password : ''
  }
  constructor(private userService : UserService,
    private ruoter : Router,
    private noti : NotificationService,
    private sidenav : SidenavComponent) { }

  ngOnInit() {
    //  alert('login');
  }

  onSubmit(form : any ) {

    this.cNomUser = null;
    this.cPassword = null;

    let oUser = <Users> form;
    this.cPasswordIntro = oUser.password;

    this.userService.getUsers(oUser.nombre).subscribe(
      result  =>  this.useData(result),
      error => console.log(<any>error)
      );
  }

  useData(result){

    this.datos = result;
    this.datos.forEach((item) =>  
      { this.cPassword = item.password; 
        this.cNomUser = item.nombre
      });

    if(this.cNomUser == null)
    {
      this.noti.warning('Usuario no existe.');
      return;
    }
    
    if(this.cPassword.toLowerCase().trim() != this.cPasswordIntro.toLocaleLowerCase().trim())
    {
      this.noti.warning('Password digitado es incorrecto.');
      return;
    }

    this.sidenav.lAllowed = true;
    this.ruoter.navigateByUrl('/');
  }
}
