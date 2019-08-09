import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service : EmployeeService ,
    private dialog : MatDialog,
    private noti : NotificationService,
    private dialogService : DialogService,
    private sidenav : SidenavComponent) { }
 
  //listData : MatTableDataSource<any>;
  fleetData = null;
  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['fullName','email','mobile','city','actions'];
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  searchKey : string; 

  ngOnInit() {

    //this.listData = new MatTableDataSource();
    
    this.populateList(); //300519
    this.sidenav.current = 'Administrativo' + ' - ABM Empleados'
  }

  populateList() {
    //alert('entro a polulate list');
    this.service.getEmployees().subscribe(
      data  =>  {
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate =   (datas,filter) => {
            return this.displayedColumns.some(ele =>{
              return ele != 'actions' && datas[ele].toLowerCase().indexOf(filter) != -1;
            });
        };
      }
    ) ;
    
    /*for (let numero of this.service.employeeList){
      alert(numero.fullName);
    }*/
    
    this.listData = new MatTableDataSource(this.service.employeeList);
}

onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}


onCreate() {
  this.service.initializeFormGroup();

  this.common();
}

onEdit(row){
  //alert('Edit EmployeeList ' + row.idEmployee);
  this.service.populateForm(row);
  this.common();
}

//300519
onDelete(idEmple : any){
  //alert('Func onDelete: '+ idEmple.idEmployee);
  /*if (confirm('Seguro de borrar este registro?')){
    this.service.deleteEmployee(idEmple.idEmployee).subscribe(res => {
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

      this.service.deleteEmployee(idEmple.idEmployee).subscribe(respu => {
        this.populateList();
      });
      this.noti.warning("Registro ha sido borrado.");
    });
}
common(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(EmployeeComponent,dialogConfig);

  this.dialog.afterAllClosed.subscribe(res => {
    if (this.service.lSalvo)
    {
      this.populateList();
      this.service.lSalvo = false;
    }
});
  
}

populateForm(banco : Employee){
    this.service.formData = Object.assign({}, banco );
  }

}
