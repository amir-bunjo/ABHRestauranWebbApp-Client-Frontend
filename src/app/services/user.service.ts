import { Injectable } from '@angular/core';
import { HttpHeaders ,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http: HttpClient) { }

  saveUser(newUser: any){
    return this.http.post('http://localhost:8080/api/create/user',newUser);
  }

  getAllUsers(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/user',{headers});
  }

  deleteUser(id: number){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.delete('http://localhost:8080/api/user/'+ id,{headers}); 
  }
}
