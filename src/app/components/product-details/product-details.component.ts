import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductByID(id).subscribe(product => {
      if (typeof product === 'string') {
        this.product = JSON.parse(product);
      } else {
        this.product = product;
      }
    });
  }

  addToCart(product?: Product): void {
    if (!product) return;
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}