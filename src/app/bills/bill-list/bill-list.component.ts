import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from 'src/app/shared/bill.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  constructor(private service : BillService,
              private router : Router,
              private dialogService : DialogService,
              private noti : NotificationService) { }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['idBill','fechaCorta','nombreCliente','pMethod','gTotal','actions'];
  searchKey : string;

  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  ngOnInit() {
    this.populateList();
  }

  populateList() {
    this.service.getFacturas().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort; 
      this.listData.paginator = this.paginator;

      /*this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          return ele !='actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };*/

    });

    this.listData = new MatTableDataSource(this.service.billList);
  }
  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.router.navigateByUrl('/bill');
  }

  onEdit(row){
    
    this.service.idBill = row.idBill;
    this.service.idCliente = row.idCliente;
    this.service.pMethod = row.pMethod;
    this.service.gTotal = row.gTotal;
    this.service.billNo = row.billNo;
    this.service.fechaCorta = row.fechaCorta;

    this.router.navigateByUrl('/bill/edit/' + row.idBill);
  }

  onDelete(row){
    //060819
      this.dialogService.openConfimDialog('Seguro de Borrar esta Factura?' )
        .afterClosed().subscribe(res => {
          if(!res)
          {
            return;
          }
          this.service.deleteFactura(row.idBill).then(res => 
            {
              this.populateList();
              this.noti.warning('Factura ha sido borrada...');
            });
          }); 
    }

}
