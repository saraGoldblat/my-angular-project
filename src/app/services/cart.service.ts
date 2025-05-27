import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private cart: Product[] = [];

  // הוספת מוצר לעגלה
  addToCart(product: Product): void {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.stockQuantity += 1;
    } else {
      this.cart.push({ ...product, stockQuantity: 1 });
    }
  }

  // קבלת כל המוצרים בעגלה
  getCart(): Product[] {
    return this.cart;
  }

  // הסרת מוצר מהעגלה
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(p => p.id !== productId);
  }
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(p => p.id === productId);
    if (item) item.stockQuantity = quantity;
  }

  // ניקוי כל העגלה
  clearCart(): void {
    this.cart = [];
  }
  getTotal(): number {
    return this.cart.reduce((sum, p) => sum + p.price * p.stockQuantity, 0);
  }
}
