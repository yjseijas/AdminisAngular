import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from "./material/material.module";
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import {EmployeeService} from './shared/employee.service';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CuentaComponent } from './cuentas/cuenta/cuenta.component';

import { CuentaService } from './shared/cuenta.service';
import { TiposCuentasService } from './shared/tipos-cuentas.service';
import { CuentasListComponent } from './cuentas/cuentas-list/cuentas-list.component';
import { AppRoutingModule,routingComponents } from './app-rounting.module';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderService } from './shared/order.service';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { ClienteService } from './shared/cliente.service';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CiudadService } from './shared/ciudad.service';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { BillComponent } from './bills/bill/bill.component';
import { BillsComponent } from './bills/bills.component';
import { BillService } from './shared/bill.service';
import { BillItemsComponent } from './bills/bill-items/bill-items.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';
import { ItemService } from './shared/item.service';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { ItemListComponent } from './items/item-list/item-list.component';

  
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,
    CuentasComponent,
    CuentaComponent,
    CuentasListComponent,
    MenuComponent,routingComponents,HomeComponent,
    SidenavComponent,UserComponent,LoginComponent,OrdersComponent,OrderComponent,OrderItemsComponent,
    ClienteComponent,ClientesComponent,ClienteListComponent,BillComponent,BillsComponent,BillItemsComponent,
    BillListComponent,ItemsComponent,ItemComponent,ItemListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [CuentaService,
    EmployeeService,TiposCuentasService,UserService,OrderService,
      ClienteService,CiudadService,BillService,ItemService],
  bootstrap: [AppComponent],
  entryComponents:[EmployeeComponent,MatConfirmDialogComponent,CuentaComponent,
    OrderItemsComponent,ClienteComponent,BillItemsComponent,ItemComponent]
})
export class AppModule { }
