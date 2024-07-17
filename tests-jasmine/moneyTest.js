import formatCurrency from '../scripts/utils/money.js';

// describe function is provided by jasmine and it creates test suite
describe('test suite: formatCurrency', () => {

  // it() is another function provided by jasmine and it creates a test
  it('convert cents into dollars', () => {
    
    //expect() lets us compare a value to another
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  
  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});