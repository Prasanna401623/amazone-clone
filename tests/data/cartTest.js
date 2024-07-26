// There is problem with testing addToCart because addToCart contains quantitySelector variable. 
// quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
// While the code of testing runs, it shows null. So, the testing of addToCart couldn't be done.
// This is the code I could write and work and I also used chatgpt to clear some things. For this test, I will have to come back again. 


import { addToCart, loadFromStorage, cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";


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

// describe function is used to test suite: removeFromCart. It checks if the removeFromCart() function works properly or not. 
describe('test suite: removeFromCart', () => {

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"; 

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
    
    // spyOn is used to create a fake version of localStorage.getItem. And it returns two products.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId:'1'

      },{

        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'

      }]);
    });

    // loadFromStorage() is called which contains cart variable. That means the cart variable will contain the two products. 
    loadFromStorage();

  });

  // afterEach function is used to write to code that can be applied after each test. In this case, after each test the original localStorage is restored. 
  afterEach(() => {
    
    // Restore the original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  // it function is used to check if the product in the cart is removed or not. 
  it('remove a productId that is in the cart', () => {

    // removes the first product from the cart 
    removeFromCart(productId1);

    // checks if the length of new cart is 1
    expect(cart.length).toEqual(1);
  });

  // it function is used to check if the product (not in the cart) is removed nothing changes. 
  it('remove a productId that is not in the cart', () => {

    // removes a product that is not in the cart.
    removeFromCart('id1');

    // checks if the length of new cart is 2 i.e, no changes
    expect(cart.length).toEqual(2);
  });
});

// describe is used to create a new test suite for updateDeliveryOption
describe('test suite: updateDeliveryOption', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"; 

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

  // it function is used to test updateDeliveryOption
  it('update delivery option', () => {

    // spyOn is used to create a fake version of localStorage.getItem. And it returns two products.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1, 
        quantity: 2,
        deliveryOptionId:'1'

      },{

        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    // loadFromStorage() is called. As this contains cart variable, the cart variable equals to the array returned by mocked localStorage.getItem.
    loadFromStorage();

    // updates the first product's delivery option id to 3.
    updateDeliveryOption(productId1, '3');
    
    // updates the second product's delivery option id to 2.
    updateDeliveryOption(productId2, '2');

    // checks if the delivery option id of first product equals 3.
    expect(cart[0].deliveryOptionId).toEqual('3');

    // checks if the delivery option of the second product equals 2.
    expect(cart[1].deliveryOptionId).toEqual('2');

    // checks if the product id of first product matches with  productId1
    expect(cart[0].productId).toEqual(productId1);

    // checks if the product id of second product matches with the productId2.
    expect(cart[1].productId).toEqual(productId2);

    // checks if the cart contains two products (objects)
    expect(cart.length).toEqual(2);

    // checks if the set item has been called twice because two products' delivery option has been updated.
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    // checks if the localStorage.setItem has been updated or not.
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1, 
      quantity: 2,
      deliveryOptionId:'3'

    },{

      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]));

  });

  // it function is used to test if wrong product id is provided
  it('does nothing if we give productId that is not in the cart', () => {

    // spyOn is used to create a fake version of localStorage.getItem. And it returns two products.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1, 
        quantity: 2,
        deliveryOptionId:'1'

      },{

        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    // loadFromStorage() is called. As this contains cart variable, the cart variable equals to the array returned by mocked localStorage.getItem.
    loadFromStorage();

    updateDeliveryOption('wrong-product-id', '1');

    // checks if nothing has changed
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].quantity).toEqual(2);
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].deliveryOptionId).toEqual('1');
    expect(cart[1].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });
});
