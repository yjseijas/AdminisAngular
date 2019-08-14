import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
//yjs 140819
export class ItemListComponent implements OnInit {

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['itemId','name','price','fechaCorta','desActivo','actions'];
  searchKey : string;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private service : ItemService,
              private noti : NotificationService,
              private dialog : MatDialog,
              private dialogService : DialogService,
              private sideNav : SidenavComponent,
              private changeDetectorRef : ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.populateList();
    this.sideNav.current = 'Administrativo' + '- ABM Productos ';
  }
//yjs 140819
  populateList() {
    this.service.getItems().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort; 
      this.listData.paginator = this.paginator;

      /*this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          return ele !='actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };*/
    });

    this.listData = new MatTableDataSource(this.service.itemList);
  }

  onSearchClear()
  {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter()  
  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initialiazeFormGroup();
    this.common();
  }

  onEdit(row)
  {
    this.service.populateForm(row);
    this.common();
  }

  common(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ItemComponent,dialogConfig);
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
  
}
