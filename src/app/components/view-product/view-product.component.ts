import { Component } from '@angular/core';
import { Product } from '../../classes/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-product',
  imports: [],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  products: Array<Product>=[];

  private subscription:Subscription=new Subscription(); //מנוי חדש
  constructor(private productService:ProductService,private userService:UserService){}

  ngOnInit(): void {
    //subscribe-רישום והאזנה לארוע כלומר הוא מאזין למידע שמגיע 
    //כל פונקציה שיש עליה Obserable חייב להיות לה מאזין  
    this.subscription=this.productService.getAllProducts().subscribe(data=>this.products=data);
   

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
