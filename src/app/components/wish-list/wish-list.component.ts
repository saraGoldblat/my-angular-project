import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../classes/product';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  imports: [NgFor,CommonModule,MatIcon],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit, OnDestroy {
  wishList: Product[] = [];
  private subscription: Subscription = new Subscription();

  @Output() closeWishList: EventEmitter<void> = new EventEmitter<void>();

  constructor(private wishListService: WishListService) {}

  ngOnInit(): void {
    this.subscription = this.wishListService.wishList$.subscribe(products => {
      this.wishList = products;
    });
  }

  onClose(): void {
    this.closeWishList.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}