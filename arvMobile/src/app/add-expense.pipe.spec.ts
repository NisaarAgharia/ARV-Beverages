import { AddExpensePipe } from './add-expense.pipe';

describe('AddExpensePipe', () => {
  it('create an instance', () => {
    const pipe = new AddExpensePipe();
    expect(pipe).toBeTruthy();
  });
});
