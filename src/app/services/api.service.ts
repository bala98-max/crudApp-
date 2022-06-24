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
    return this.http.post<any>('http://localhost:3000/userlist',data)
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


}
