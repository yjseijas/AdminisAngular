import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CuentaService } from 'src/app/shared/cuenta.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { CuentaComponent } from '../cuenta/cuenta.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

  constructor(private service : CuentaService,
    private noti : NotificationService,
    private dialog : MatDialog,
    private dialogService : DialogService,
    private sidenav : SidenavComponent,
    private changeDetectorRefs: ChangeDetectorRef) { }

    listData : MatTableDataSource<any>;
    displayedColumns : string[] = ['idCuenta','descripcion','descriRecibe','descriAjusta','descriActivo','desTipo','actions'];
    searchKey : string;

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator : MatPaginator;
  ngOnInit() {
    this.populateList(); //030619
    this.sidenav.current = 'Administrativo' + ' - ABM Cuentas Contables' // 06/06/19
  }

  populateList() {
    this.service.getCuentas().subscribe(
      data  =>  {
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

/*        this.listData.filterPredicate =   (datas,filter) => {
            return this.displayedColumns.some(ele =>{
              return ele != 'actions' && datas[ele].toLowerCase().indexOf(filter) != -1;
            });
        };*/
      }
    ) ;

    this.listData = new MatTableDataSource(this.service.cuentaList);  
  }

  onSearchClear(){
      this.searchKey = "";
      this.applyFilter();
  }

  applyFilter(){
      this.listData.filter = this.searchKey.trim().toLowerCase();
  }    

  onCreate(){
    this.service.initializeFormGroup();
    /*const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(CuentaComponent,dialogConfig);*/
    this.common();
  }

  onEdit(row){
    this.service.populateForm(row);
    this.common();
  }

  common(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CuentaComponent,dialogConfig);
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
      this.changeDetectorRefs.detectChanges();
    }
  }

  onDelete(cuenta : any){

/*    if (confirm('Seguro de borrar este registro?')){
        this.service.deleteCuenta(cuenta.idCuenta).subscribe(res => {
          this.populateList();
        });
      this.noti.warning("Registro ha sido borrado.");
    }*/

    this.dialogService.openConfimDialog('Seguro que desea eliminar este registro?')  
    .afterClosed().subscribe(res =>{
      if (!res)
      {
        return
      }
      this.service.deleteCuenta(cuenta.idCuenta).subscribe(res => {
        this.populateList();
      });
      this.noti.warning("Registro ha sido borrado.");
    });

  }
  
}
