import { Injectable } from '@angular/core';
import { MatSnackBar ,MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar : MatSnackBar) { }

  config : MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition : "right",
    verticalPosition: "top"
  }

  success(msg){
    this.config['panelClass'] = ['notification','success'];
    this.snackbar.open(msg,'',this.config); 
  }

  warning(msg) {
    this.config['panelClass'] = ['notification','warn'];
    this.snackbar.open(msg,'',this.config); 
  }
}
