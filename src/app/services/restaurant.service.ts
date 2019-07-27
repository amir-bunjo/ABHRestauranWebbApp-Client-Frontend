import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';

var user = 3

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  num: number;
  username = sessionStorage.getItem('username');
  password = sessionStorage.getItem('password');

  constructor(private http: HttpClient) { }

  saveReservation(reservation) {
   
     
    
    let reservationModel = {
      'time': reservation.time + ":00",
      'date': reservation.date,
      'guestNumber': parseInt(reservation.guest)
    }
  
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    //
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/reservation/${reservation.restaurant.id}/${reservation.tableId}`, reservationModel, { headers });
  }

  getAllRestaurants() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + btoa(this.password)) });
    return this.http.get('http://localhost:8080/api/allrestaurant', { headers });
  }

  getRestaurantsWithStartIndex(startIndex: number) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurants/' + startIndex, { headers });
  }

  getRestaurantsTableLength() {
  
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/length', { headers });
  }

  getMatchedRestaurants(patern: String,mark: number, price:number, cousines, page: number) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/restaurant/matchpatern/${patern}/${mark}/${price}/${page}`, cousines ,{ headers });
  }

  getCountMatchedRestaurants(patern: String,mark: number, price:number, cousines, page: number) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/restaurant/count/matchpatern/${patern}/${mark}/${price}/${page}`, cousines ,{ headers });
  }


  getRestaurantById(id: number) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/' + id, { headers });

  }

  getCountOfAvailableTable(restaurantId: number) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/table/available/count/' + restaurantId, { headers });
  }

  getTodayReservedNumber(restaurantId, dateString) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });

    return this.http.get(`http://localhost:8080/api/reservation/available/count/${restaurantId}/${dateString}`, { headers });
  }

  getReservetionsByDateAndGuestNumber(restaurantId, date, seats, time) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/reservations/restaurant/${restaurantId}/timescope/${time}/bydate/${date}/byguest/${seats}`, { headers });

  }

  getTablesBySeats(restaurantId, seats, date, time) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/table/restaurant/seats/${restaurantId}/${seats}/${date}/${time}`, { headers });

  }

  updateRestaurant(restaurantModel) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.put(`http://localhost:8080/api/update/restaurant`, restaurantModel, { headers });

  }

  saveReview(reviewModel) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/save/review/${username}`, reviewModel, { headers });
  }

  getReviewMark(restaurantId) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    if (username == null) username = '-';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/reviews/${restaurantId}/${username}`);
  }

  getAvailableRestaurants (name,seats, date,  time) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/restaurant/avalable/${name}/${seats}/${date}/${time}`, { headers });
  }


  getRestaurantRating(restaurantId) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/reviews/average/${restaurantId}`, { headers });
  }

  getRestaurantsNameAndId(startIndex) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/restaurant/name/id/${startIndex}`, { headers });
  }

  saveRestaurant(restaurantModel,coverName,logoName) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/save/restaurant/${coverName}/${logoName}`, restaurantModel, { headers });
  }

  deleteRestaurant(restaurantId: number) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.delete(`http://localhost:8080/api/restaurant/${restaurantId}`, { headers });

  }

  saveImageToCloudinary(restaurantId: number, imgString) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/restaurant/image/upload/${restaurantId}`, imgString, { headers });
  }

  saveMenu(listOfMeals) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/save/meals`, listOfMeals, { headers });
  }

  saveTables(listOfTables) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/save/tables`, listOfTables, { headers });
  }

  saveCategory(category) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.post(`http://localhost:8080/api/save/category`, category, { headers });
  }

  getAllCategory() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/allcategories`, { headers });
  }

  getCategoryById(categoryId) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/category/${categoryId}`, { headers });
  }

  deleteCategoryById(categoryId) {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.delete(`http://localhost:8080/api/delete/category/${categoryId}`, { headers });
  }


  getAllUsers() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/allusers`, { headers });
  }


  
}
