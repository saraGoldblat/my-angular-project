import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../classes/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryURL: string = 'https://localhost:7158/api/Category';

  constructor(private http: HttpClient) {}

  // מביא את כל הקטגוריות
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL);
  }

  // מביא קטגוריה לפי מזהה
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/${id}`);
  }

  // מביא קטגוריה לפי שם
  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/byname/${name}`);
  }

  // הוספת קטגוריה חדשה
  addCategory(category: Category): Observable<any> {
    return this.http.post(this.categoryURL, category);
  }

  // עדכון קטגוריה קיימת
  updateCategory(category: Category): Observable<any> {
    return this.http.put(`${this.categoryURL}/${category.id}`, category);
  }

  // מחיקת קטגוריה לפי מזהה
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.categoryURL}/${id}`);
  }
}

