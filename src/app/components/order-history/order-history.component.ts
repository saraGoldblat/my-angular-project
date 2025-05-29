import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Order } from '../../classes/order';

@Component({
  selector: 'app-order-history',
  imports: [NgFor,NgIf,DatePipe,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  user: any; // Define the user property

  constructor(private orderService: OrderService, private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.currentUserSubject.value;
    if (typeof user === 'string') {
      this.user = JSON.parse(user);
    } else {
      this.user = user;
    }
    if (user) {
      this.orderService.getOrdersByUserId(this.user.userId).subscribe(data => this.orders = data);
    }
  }
}
