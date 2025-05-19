import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURL:string="https://localhost:7158/api/Product"
  
  //מודול מובנה באנגולר שמאפשר ליצור קריאות לשרת 
  constructor(private http:HttpClient) { }
//פונקציה שמחזירה את כל המוצרים
  getAllProducts():Observable<Array<Product>>
  {
    return this.http.get<Array<Product>>(this.productURL)//נפתח צינו של הבקשה וברגע שהי אתגיע נפתח PULSE של מידע 
  }
  //פונקציה שמקבלת מספר ומחזירה מוצר מסוים
  getProductByID(productId:number): Observable<Product>{
    return this.http.get<Product>(`${this.productURL}/${productId}`,{responseType:'text' as 'json'})
  }
  deleteProduct(productId:Number) : Observable<any>{
    return this.http.delete(`${this.productURL}/${productId}`)
  }
  editProduct(productId:Number,newProduct: Product):Observable<any>{
  return this.http.put(`${this.productURL}/${productId}`,newProduct)

  }
}
