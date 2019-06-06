import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { zhCnLocale } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  saveUser(newUser: any){
    let username='kris@gmail.com'
    let password='kris123'

    console.log('Basic ' + btoa(username + ':' + password));
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + password) });

    return this.http.post('http://localhost:8080/api/create/user',newUser,{headers});
  }

  getAllUsers(){
    let username='kris@gmail.com'
    let password='kris123'

    console.log('Basic ' + btoa(username + ':' + password));
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + password) });

   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get('http://localhost:8080/api/user',{headers});
  }

  deleteUser(id: number){

    return this.http.get('http://localhost:8080/api/user'+ id);
    
  }
}
