// There is problem with testing addToCart because addToCart contains quantitySelector variable. 
// quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
// While the code of testing runs, it shows null. So, the testing of addToCart couldn't be done.
// This is the code I could write and work and I also used chatgpt to clear some things. For this test, I will have to come back again. 


import { addToCart, loadFromStorage, cart } from "../../data/cart.js";


// describe function is provided by jasmine. It used to test suite i.e, group of tests. It takes two parameters. The first parameter is the name of test suite (string), and second parameter is the function (the test you want to do).
describe('test suite: addToCart', () => {

  
  let originalLocalStorage;


  // beforeEach function is used to create codes that is applied before each test. This is done so that there is no leakage of test code that could affect main project. 
  beforeEach(() => {

    // Backup the original localStorage. This code creates a backup of the current state of localStorage. It copies all of 'localStorage' properties into new object called originalLocalStorage. This is done so we can restore the original state later.
    originalLocalStorage = { ...localStorage };

    // mockLocalStorage is assigned to a function.
    const mockLocalStorage = (function() {

      // store is assigned to empty object. It is used to simulate the 'localStorage' interface.
      let store = {};

      // the function returns the object that mimic the functionality of 'localStorage'. The object has getItem and setItem. Key is used to save and retrive the data. 
      return {
        getItem: function(key) {
          return store[key] || null;
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        }
      };
    })();

    // Replace the global localStorage with the mock
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    // spyOn is used to create a fake version of localStorage.setItem so the testing code doesn't interfere with main program. 
    spyOn(localStorage, 'setItem');

  });

  // afterEach function is used to write to code that can be applied after each test. In this case, after each test the original localStorage is restored. 
  afterEach(() => {
    
    // Restore the original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  // it function is used to create test single section. It takes two parameters. The first parameter is the name of test you want to do (string) and the second parameter is function that contains the test code you want to use. 
  it('adds a new product in the cart', () => {

    // spyOn helps us to create a  fake version of localStorage.getItem. And that fake version returns an empty.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    })

    // Mocking document.querySelector to return a fake element with the desired value
    spyOn(document, 'querySelector').and.callFake((selector) => {
      if (selector === '.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6') {
        return { value: '1' };
      }
      return null;
    });

    // Load the cart from storage (should be empty because of the mock)
    loadFromStorage();

    // Call the function to add the product to the cart
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Check if the cart contains the product
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Check of the length of cart i.e, the amount of product in the cart equals 1.
    expect(cart.length).toEqual(1);

    // Check if the localStorage.setItem has been called once. This expectation can only be used when spyOn is used. 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // check if the first product's quantity equals 1.
    expect(cart[0].quantity).toEqual(1);

    // checks if localStorage.setItem received the correct values. 
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId:'1'
    }]));
  });

  it('adds an existing product in the cart', () => {

    // spyOn helps us to create a  fake version of localStorage.getItem. And that fake version returns an empty 
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId:'1'
      }]);
    });
    
    // Mocking document.querySelector to return a fake element with the desired value
    spyOn(document, 'querySelector').and.callFake((selector) => {
      if (selector === '.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6') {
        return { value: '1' };
      }
      return null;
    });

    // Load the cart from storage (should be empty because of the mock)
    loadFromStorage();

    // Call the function to add the product to the cart
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Check if the cart contains the product
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Check of the length of cart i.e, the amount of product in the cart equals 1.
    expect(cart.length).toEqual(1);

    // Check if the localStorage.setItem has been called once. This expectation can only be used when spyOn is used. 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // check if the first product's quantity equals 2.
    expect(cart[0].quantity).toEqual(2);

    // checks if localStorage.setItem received the correct values. 
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId:'1'
    }]));
  })
});
