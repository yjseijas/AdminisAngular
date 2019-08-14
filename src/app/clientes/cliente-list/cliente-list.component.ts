import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/shared/cliente.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogService } from 'src/app/shared/dialog.service';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';
import { ClienteComponent } from '../cliente/cliente.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
// yjs 310719
export class ClienteListComponent implements OnInit {

  constructor(private service : ClienteService,
              private noti : NotificationService,
              private dialog : MatDialog,
              private dialogService : DialogService,
              private sideNav : SidenavComponent,
              private changeDetectorRef : ChangeDetectorRef) { }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['descripcion','email','mobile','desCiudad','fechaCorta','desActivo','actions'];
  searchKey : string;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  ngOnInit() {
    this.populateList();
    this.sideNav.current = 'Administrativo' + '- ABM Clientes '
  }

  populateList() {
    this.service.getClientes().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort; 
      this.listData.paginator = this.paginator;

      this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          return ele !='actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });

    this.listData = new MatTableDataSource(this.service.clienteList);
  }

  onSearchClear()
  {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()
  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  common(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClienteComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      res => 
      this.refresca(),
      error => console.log(<any>error)
    );
    
  }
  refresca(){
    if (this.service.lSalvo)
    {
      this.populateList();
      this.service.lSalvo = false;
      this.changeDetectorRef.detectChanges();
    }
  }
  onCreate()
  {
    this.service.inicializaForm();
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClienteComponent,dialogConfig);*/
    this.common();
  }

  onEdit(row)
  {
    alert(row.activo);
    alert(row.fechaAlta);
    this.service.populateForm(row);

    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClienteComponent,dialogConfig);*/
    this.common();
  }

  onDelete(row)
  {
/*    if (confirm('Desea Borrar?'))
    {
      this.service.deleteCliente(row.idCliente).subscribe(res =>{
        this.noti.warning('Registro Borrado.');
      });
    }*/

    this.dialogService.openConfimDialog('Seguro de borrar este cliente?').
      afterClosed().subscribe(res => {
        if (!res)
        {
          return;
        }
        this.service.deleteCliente(row.idCliente).subscribe(res =>{
          this.populateList();
          this.noti.warning('Registro Borrado.');
          });
        });


  }


  
}
