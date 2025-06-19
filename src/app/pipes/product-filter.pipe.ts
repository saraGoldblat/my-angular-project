import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../classes/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
  if (!searchText || searchText.trim() === '') {
  return products;
}
    searchText = searchText.toLowerCase();
    return products.filter(product => product.name.toLowerCase().includes(searchText));
  }

}
