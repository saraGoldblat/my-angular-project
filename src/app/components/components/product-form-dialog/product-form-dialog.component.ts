
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../classes/product';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../../classes/category';
import { CategoryService } from '../../../services/category.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form-dialog',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatDialogModule,MatOptionModule,MatSelectModule],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss'
})
export class ProductFormDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null },
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      id:[data.product?.id],
      name: [data.product?.name || '', Validators.required],
      description: [data.product?.description || ''],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0)]],
      stockQuantity: [data.product?.stockQuantity || 0, [Validators.required, Validators.min(0)]],
      imageSrc: [data.product?.imageSrc || ''],
      categoryId: [data.product?.categoryId || null, Validators.required],
      categoryName: [data.product?.category?.name_category || '']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }

  save() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      // מצאי את אובייקט הקטגוריה המלא לפי ה-id שנבחר
      const category = this.categories.find(c => c.id === formValue.categoryId);
      // בני את אובייקט המוצר המלא
      const productToSend = {
        ...formValue,
        category: category
      };
      this.dialogRef.close(productToSend);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}