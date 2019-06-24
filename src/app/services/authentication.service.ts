import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

export class Login{
  constructor(
    public status:string,
     ) {}
  }

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginResult: any
  constructor(private http: HttpClient) { }

  authenticate(username, password) {

    console.log('username  ' + username + '  password ' + password);
    console.log('cryped pass:  ' + btoa(password));
    let cryptedPass = btoa(password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + cryptedPass) });
    return this.http.get<Login>('http://localhost:8080/api/validateLogins',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('password',password);
        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log("is user logged in " + user + '  ' + !(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password')
  }
  
}