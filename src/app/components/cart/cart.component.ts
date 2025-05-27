import { Component } from '@angular/core';
import { Product } from '../../classes/product';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService) {}

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
}
