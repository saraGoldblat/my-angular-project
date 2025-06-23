import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OrderService } from '../../services/order.service';
import { Order } from '../../classes/order';

@Component({
  selector: 'app-admin-orders',
  imports: [ 
    CommonModule, NgIf, NgForOf  
     ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent  implements OnInit {
   allOrders: Order[] = [];
  loading = false;
  errorMsg = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: orders => {
        console.log('All orders:', orders);
        this.allOrders = orders;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load orders';
        this.loading = false;
      }
    });
  }
}