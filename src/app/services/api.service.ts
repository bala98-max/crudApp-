import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private subject = new Subject<any>();

  createuser(data:any){
    console.log('data',data);
    
  //  let check = this.http.get<any>('http://localhost:3000/userlist?firstName='+data.firstName);
  //  console.log('check',check,typeof(check));
  //  return check
    return this.http.post<any>('http://localhost:3000/userlist',data)
  }

  updateuser(data:any,id:number){
    // console.log('id----',id);
    return this.http.put('http://localhost:3000/userlist/'+id,data)
  }
  getusers(){
    return this.http.get('http://localhost:3000/userlist')
  }

  tableupdate(){
    this.subject.next('clicked');
  }

  getupdateTable() : Observable<any>{
    return this.subject.asObservable();
  }

  deleteUser(id:number):Observable<any>{
    console.log('id-----',id);
    
    return this.http.delete('http://localhost:3000/userlist/'+id)
  }

}
