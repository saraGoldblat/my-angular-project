import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURL:string="https://localhost:7158/api/Order"

  constructor(private http:HttpClient) { }
  getAllOrders():Observable<Array<Order>>
  {
    const token = localStorage.getItem('authToken'); // שליפת ה-token מ-localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת ה-token לכותרת Authorization
    });

    return this.http.get<Array<Order>>(this.orderURL, { headers })//נפתח צינו של הבקשה וברגע שהי אתגיע נפתח PULSE של מידע 
  }
  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderURL}/user/${userId}`);
  }
}





