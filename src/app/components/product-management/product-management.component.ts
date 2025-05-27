import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProductFormDialogComponent } from '../components/product-form-dialog/product-form-dialog.component';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-management',
  imports: [NgIf,NgFor,FormsModule,NgClass,CommonModule,ReactiveFormsModule,  MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  showOutOfStock = false;
  productForm: FormGroup;
  editingProduct: Product | null = null;
  showForm = false;  categories: Category[] = [];

  constructor(private dialog: MatDialog,private productService: ProductService, private fb: FormBuilder,private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      price: [0],
      quantity: [0],
      imageSrc: ['']
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }
  loadOutOfStock() {
    this.productService.getOutOfStockProducts().subscribe(data => this.products = data);
  }

  toggleOutOfStock() {
    this.showOutOfStock = !this.showOutOfStock;
    this.showOutOfStock ? this.loadOutOfStock() : this.loadProducts();
  }

  startEdit(product: Product) {
    this.editingProduct = product;
    this.productForm.patchValue(product);
  }
  openAddProduct() {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      data: { product: null }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ודאי שהקטגוריה נשלחת בפורמט הנכון
        const category = this.categories.find(c => c.id === result.categoryId);
        result.category = category;
  
        console.log('Product to add:', result); // בדקי מה נשלח לשרת
        this.productService.addProduct(result).subscribe({
          next: () => this.loadProducts(),
          error: error => {
            console.error('Error adding product:', error); // הצגת שגיאה בקונסול
            alert('Failed to add product. Please check the data and try again.');
          }
        });
      }
    });
  }
  
  openEditProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      data: { product }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.editProduct(product.id, result).subscribe(() => this.loadProducts());
      }
    });
  }
  closeForm() {
    this.showForm = false;
    this.productForm.reset();
  }
  saveProduct() {
    const product = this.productForm.value;
  
    if (!product.categoryId) {
      alert('Please select a category for the product.');
      return;
    }
  
    if (this.editingProduct) {
      this.productService.editProduct(product.id, product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: err => {
          alert('Failed to update product. Please try again.');
          console.error(err);
        }
      });
    } else {
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: err => {
          alert('Failed to add product. Please try again.');
          console.error(err);
        }
      });
    }
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  cancelEdit() {
    this.editingProduct = null;
    this.productForm.reset();
  }
}
