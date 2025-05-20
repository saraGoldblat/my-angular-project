import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Array<Order>>(this.orderURL)//נפתח צינו של הבקשה וברגע שהי אתגיע נפתח PULSE של מידע 
  }
}





