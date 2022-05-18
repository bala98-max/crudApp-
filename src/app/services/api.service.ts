import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createuser(data:any){
    return this.http.post<any>('http://localhost:3000/userlist',data)
  }

  getusers(){
    return this.http.get('http://localhost:3000/userlist')
  }
}
