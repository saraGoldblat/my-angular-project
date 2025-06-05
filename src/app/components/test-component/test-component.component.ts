import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../classes/user';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-test-component',
  imports: [],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent {
  constructor(private http: HttpClient,private orderService:OrderService) {}

  testLogin() {
    const user:User = {
    "userId": 1,
    "username": "aaa",
    "password": "1234567",
    "lastName": "Greenfeld",
    "phone": "1234567565",
    "address": "Some Address",
    "email": "aaa@example.com"
}
    const url = "https://localhost:7158/api/Login";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<{ token: string }>(url, user, { headers }).subscribe({
     next: (response) => {
    console.log('Full response:', response);
    console.log('Token received:', response.token);
    localStorage.setItem('authToken', response.token); // שמירת הטוקן ב-localStorage
    alert('Login successful!');
  },
  error: (error) => {
    console.error('Login failed:', error);
    alert('Login failed!');
  }
});
  }
  getAllorders() {  
    return this.orderService. getAllOrders().subscribe({
      next: (orders) => {
        console.log('Orders:', orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}
