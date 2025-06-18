import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
 private wishListSubject = new BehaviorSubject<Product[]>([]);
  wishList$ = this.wishListSubject.asObservable();

  addProduct(product: Product): void {
    const currentList = this.wishListSubject.getValue();
    if (!currentList.find(p => p.id === product.id)) {
      this.wishListSubject.next([...currentList, product]);
    }
  }
}
