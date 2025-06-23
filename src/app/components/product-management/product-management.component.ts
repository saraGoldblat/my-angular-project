import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../components/product-form-dialog/product-form-dialog.component';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-product-management',
  imports: [NgIf, NgFor, FormsModule, NgClass, CommonModule, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDialogModule,MatSelect,MatOption],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];   // משתנה חדש לשמירת כל המוצרים
  categories: Category[] = [];
  showOutOfStock = false;
  productForm: FormGroup;
  editingProduct: Product | null = null;
  showForm = false;

  constructor(private dialog: MatDialog, private productService: ProductService, private fb: FormBuilder, private categoryService: CategoryService) {
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
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.allProducts = data;
    });
  }

  loadOutOfStock() {
    this.productService.getOutOfStockProducts().subscribe(data => {
      this.products = data;
      this.allProducts = data;
    });
  }

  toggleOutOfStock() {
    this.showOutOfStock = !this.showOutOfStock;
    this.showOutOfStock ? this.loadOutOfStock() : this.loadProducts();
  }

  // פונקציה לסינון לפי קטגוריה
  filterByCategory(categoryId?: number) {
    if (!categoryId) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(product => product.categoryId === categoryId);
    }
  }

  // פונקציה למיון לפי מחיר
  sortProducts(order: 'asc' | 'desc' | ''): void {
    if (order === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      this.products.sort((a, b) => b.price - a.price);
    }
    // במידה ונבחר "None", ניתן לשחזר את הסדר המקורי ע"י טעינת המוצרים מחדש:
    else {
      this.loadProducts();
    }
  }

  // שאר הפונקציות הקיימות (הוספה, עריכה, מחיקה) נשארות ללא שינוי.

  openAddProduct() {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      data: { product: null }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ודאי שהקטגוריה נשלחת בפורמט הנכון
        const category = this.categories.find(c => c.id === result.categoryId);
        result.category = category;
        result.id=0;
  
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
        this.productService.editProduct(product.id, result).subscribe({   next: () => this.loadProducts(),
          error: error => {
            console.error('Error adding product:', error); // הצגת שגיאה בקונסול
            alert('Failed to add product. Please check the data and try again.');
          }});
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
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.deleteProduct(id).subscribe({
    next: () => this.loadProducts(),
    error: err => {
      console.error('Error deleting product:', err);
      alert(`Failed to delete product (${err.status}). Check console/Network tab.`);
    }
  });
  }

  cancelEdit() {
    this.editingProduct = null;
    this.productForm.reset();
  }
}