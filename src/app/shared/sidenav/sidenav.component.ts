import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;

  lAllowed : boolean = false;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  current = 'Administrativo';
  
  /*fillerNav = this.lAllowed ? [
    {name : "Home",route : "" , icon : "home"},
    {name : "Cuentas",route : "cuentas" , icon : "account_balance"},
    {name : "Empleados",route : "empleados" , icon : "account_box"}
  ]
  : [];*/

  fillerNav =  [
    {name : "Home",route : "" , icon : "home"},
    {name : "Cuentas",route : "cuentas" , icon : "account_balance"},
    {name : "Empleados",route : "empleados" , icon : "account_box"},
    {name : "Clientes",route : "clientes" , icon : "people"},
    {name : "Ordenes Compra",route : "orders" , icon : "add_shopping_cart"},
    {name : "Facturación",route : "bills" , icon : "monetization_on"}

  ]
  

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router : Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,
       );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  shouldRun = true;

  ngOnInit() {
    this.router.navigateByUrl('/users/login');
  }

  logout() {
    this.lAllowed = false;
    this.router.navigateByUrl('/users/login');
  }

}
