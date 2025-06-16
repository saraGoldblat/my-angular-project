import { Component } from '@angular/core';
import { Product } from '../../classes/product';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService ,private router :Router) {}

  get cart(): Product[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  clear() {
    this.cartService.clearCart();
  }
   checkout() {
    // בדיקה אם יש משתמש מחובר, למשל ע"י בדיקת currentUser ב-localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // המשתמש לא מחובר – ניתוב לדף ההתחברות עם פרמטר (למשל redirect) במקרה שהוא יתחבר בהצלחה
      this.router.navigate(['/login'], { queryParams: { redirect: '/checkout' } });
    } else {
      // המשתמש מחובר – ניתוב לעמוד הביצוע (למשל עמוד אשראי)
      this.router.navigate(['/checkout']);
    }
  }
}
