import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productsText'
})
export class ProductsTextPipe implements PipeTransform {

  transform(value: string): any {
    return value.slice(0, 150) + '...'
  }

}
