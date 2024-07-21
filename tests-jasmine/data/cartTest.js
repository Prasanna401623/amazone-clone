// There is problem with testing addToCart because addToCart contains quantitySelector variable. 
// quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
// While the code of testing runs, it shows null. So, the testing of addToCart couldn't be done.
// This is the code I could write and work and I also used chatgpt to clear some things. For this test, I will have to come back again. 


import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    // Clear the cart before each test
    cart.length = 0;

    // Mocking localStorage methods
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, 'setItem');

    // Mocking document.querySelector to return a fake element with the desired value
    spyOn(document, 'querySelector').and.callFake((selector) => {
      if (selector === '.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6') {
        return { value: '1' };
      }
      return null;
    });

    // Load the cart from storage (should be empty because of the mock)
    loadFromStorage();
  });

  it('adds an existing product to the cart', () => {
    // Call the function to add the product to the cart
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Check if the cart contains the product
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    
  });
});
