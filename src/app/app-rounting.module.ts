import { NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CuentasListComponent } from './cuentas/cuentas-list/cuentas-list.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BillsComponent } from './bills/bills.component';
import { BillComponent } from './bills/bill/bill.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';
import { ItemsComponent } from './items/items.component';

const routes : Routes = [
    {path:'',component:HomeComponent},
    {path:'cuentas',component:CuentasListComponent},
    {path:'empleados',component:EmployeeListComponent}, 
    {path:'clientes',component:ClientesComponent}, 
    {path : 'items',component : ItemsComponent},
    {path:'users',component:UserComponent,
      children : [
        {path:'login',component:LoginComponent}
      ]},
    {path:'orders',component:OrdersComponent},
    {path:'order',children:[
      {path:'',component:OrderComponent},
      {path:'edit/:id',component:OrderComponent}
    ]},  
    {path:'bills',component:BillListComponent},
    {path:'bill',children:[
      {path:'',component:BillComponent},
      {path:'edit/:id',component:BillComponent}
    ]}
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule] 
})

export class AppRoutingModule {}

export const routingComponents = [CuentasListComponent,EmployeeListComponent]