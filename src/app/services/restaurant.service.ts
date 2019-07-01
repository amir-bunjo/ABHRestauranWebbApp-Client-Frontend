import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';

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
    const formData = new FormData()
    formData.append('time', reservation.time);
    formData.append('date', reservation.date);
    formData.append('guest', reservation.guest)

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

  getMatchedRestaurants(patern: String,mark: number) {

    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get('http://localhost:8080/api/restaurant/matchpatern/' + patern + '/' + mark, { headers });
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
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + btoa(password)) });
    return this.http.get(`http://localhost:8080/api/reviews/${restaurantId}/${username}`, { headers });
  }


}
