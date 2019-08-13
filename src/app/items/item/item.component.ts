import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private service : ItemService) { }

  ngOnInit() {
    
  }

  onClear()
  {
    this.service.formItem.reset()

    this.service.initialiazeFormGroup();
  }

}
