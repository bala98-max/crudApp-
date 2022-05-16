import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'

import { AdduserComponent } from './adduser/adduser.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudApp';
  constructor(private dialog: MatDialog){
  
  }
  openDialog(){
    this.dialog.open(AdduserComponent,{
      width:"40%",
      height:"78%"
    })
  }
}
