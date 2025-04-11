import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {


  transform(price : number , DissPrice : number ): number {
    return ((100-DissPrice)*price)/100 ;
  }

}
