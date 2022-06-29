import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { ApiService } from './services/api.service';
import {MatPaginator}from '@angular/material/paginator'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   userList:any;
   displayedColumns: string[] = ['id', 'firstName','gender', 'email', 'phone','city','state','action'];
   dataSource !: MatTableDataSource<any>;
   tableUpadteSubs !: Subscription
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
    title = 'crudApp';
   
  constructor(
    private dialog: MatDialog,
    private $apiService:ApiService
    ){
  this.tableUpadteSubs =  this.$apiService.getupdateTable().subscribe(()=>{
    this.getAllusers()
  })
  }
  ngOnInit(){
    this.getAllusers();
    // setTimeout(()=>{
    //   console.log("after assign",this.userList);

    // },500)
    
  }
  openDialog(){
    this.dialog.open(AdduserComponent,{
      width:"40%",
      height:"78%"
    })
  }

  


  getAllusers(){
    this.$apiService.getusers().subscribe({
      next:((res:any)=>{
        // // console.log('users table',res,typeof(res));
        // this.userList = res;
        this.dataSource = new MatTableDataSource(res)

      }),
      error:((err)=>{
        alert('Error while fetching the data');
        console.log('error form get methord-----',err);
        
      })
    })
  }

  finduser(event:Event){
    console.log('event',event);
    const filterVal = (event.target as HTMLInputElement).value;
  
    console.log('filterVal',filterVal);

    this.dataSource.filter = filterVal.trim().toLowerCase()
    console.log('dataSourse',this.dataSource.filter);
    
    
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  edituser(data:any){
    console.log('data------',data);
    
    this.dialog.open(AdduserComponent,{
      width:'45%',
      data:data
    })
  }
  deluser(data:any){

    this.$apiService.deleteUser(data.id).subscribe({
      next:((res)=>{
        console.log('user deleted');
        
      }),error:((err)=>{
        console.log('cannot del a user');
        
      }),complete:(()=>{
        this.$apiService.tableupdate()
      })
    })
  }
}
