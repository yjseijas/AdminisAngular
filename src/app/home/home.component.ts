import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sidenav : SidenavComponent) { }

  ngOnInit() {
    this.sidenav.current = 'Administrativo' + ' - Home'
  }

}
