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
/*
  getAllUsers(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/user',{headers});
  }
*/
  getAllUsers() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/allusers`, { headers });
  }

  deleteUser(id: number){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.delete('http://localhost:8080/api/user/'+ id,{headers}); 
  }

  getUserByid(userId) {
    console.log('ssaaaa')
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/get/user/${userId}`, { headers });
  }

  getUserByEmail(username) {
    // let username = sessionStorage.getItem('username');
     let password = sessionStorage.getItem('password');
     const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
     return this.http.get(`http://localhost:8080/api/user/byemail/${username}`, { headers });
   }

   getAllEmails() {

    return this.http.get(`http://localhost:8080/api/get/allemails`);
   }
}
