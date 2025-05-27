import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-product-test',
  imports: [],
  templateUrl: './product-test.component.html',
  styleUrl: './product-test.component.scss'
})
export class ProductTestComponent implements OnInit {
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   // this.testGetById(42);
 // this.testGetByCategory(16);
 //v  this.testGetOutOfStock();
 //v   this.testAddProduct();
 //v   this.testEditProduct();
 //v   this.testDeleteProduct(44); // שימי לב שזה ימחק מוצר עם id 99 אם קיים
  }

  testGetById(id: number) {
    this.productService.getProductByID(id).subscribe({
      next: product => console.log('getProductByID:', product),
      error: err => console.error('getProductByID Error:', err)
    });
  }

  testGetByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: products => console.log('getProductsByCategory:', products),
      error: err => console.error('getProductsByCategory Error:', err)
    });
  }

  testGetOutOfStock() {
    this.productService.getOutOfStockProducts().subscribe({
      next: products => console.log('getOutOfStockProducts:', products),
      error: err => console.error('getOutOfStockProducts Error:', err)
    });
  }

  testAddProduct() {
    const newProduct: Product = {
      id: 0,
      name: 'necklace',
      categoryId: 16,
      description: 'Fancy Deep Brownish Yellow HEART Diamond',
      price: 3000,
      imageSrc: 'diamond.png',
      stockQuantity: 0,
      category: {
        id: 16,
        name_category: 'ring'
      }
    };

    this.productService.addProduct(newProduct).subscribe({
      next: res => console.log('addProduct:', res),
      error: err => console.error('addProduct Error:', err)
    });
  }

  testEditProduct() {
    const editedProduct: Product = {
      id: 43,
      name: 'necklace',
      categoryId: 16,
      description: 'Fancy Deep Brownish Yellow HEART Diamond',
      price: 3000,
      imageSrc: 'diamond2.png',
      stockQuantity: 0,
      category: {
        id: 16,
        name_category: 'ring'
        }
    };

    this.productService.editProduct(1, editedProduct).subscribe({
      next: res => console.log('editProduct:', res),
      error: err => console.error('editProduct Error:', err)
    });
  }

  testDeleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: res => console.log('deleteProduct:', res),
      error: err => console.error('deleteProduct Error:', err)
    });
  }
}
