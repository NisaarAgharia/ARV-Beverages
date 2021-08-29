import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addExpense'
})
export class AddExpensePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
