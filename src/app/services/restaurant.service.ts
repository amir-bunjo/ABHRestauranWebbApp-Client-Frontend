import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getAllRestaurants(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/allrestaurant',{headers});
  }

  getRestaurantsWithStartIndex(startIndex: number){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurants/'+startIndex, {headers});
  }

  getRestaurantsTableLength() {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/length', {headers});
  }

  getMatchedRestaurants(patern: String) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/matchpatern/' +patern, {headers});
  }

  getRestaurantById(id:number) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic '+ btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/'+id ,{headers});

  }
}
