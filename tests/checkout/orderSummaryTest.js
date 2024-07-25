import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

// describe function helps us test suite i.e, group of codes. It takes two parameter: the first parameter is the name of the test (string) and the second parameter is function. The function is where you write test codes.
describe('test suite: renderOrderSummary', () => {

  let originalLocalStorage;

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

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

    // different classes has been added in js-test-container. These classes are not in our test code. So, we created these classes although none of the classes have function. 
    document.querySelector('.js-test-container').innerHTML = `
    <div class = "js-checkout-header-middle-section"></div>
    <div class = "js-order-summary"></div>
    <div class = "js-payment-summary"></div>
    `;

    // spyOn is used to mock the localStorage.setItem.
    spyOn(localStorage, 'setItem');
    
    // spyOn is used to mock localStorage.getItem. This is done so that global local Stroage isn't affected. the localStorage.getItem returns two products. 
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    // loadFromStroage() is called i.e, cart variable is called. The cart variable equals to array that contains two objects (products).
    loadFromStorage();
    
    // renderOrderSummary() is called. This renders the HTML and can be used to check if the products are deleted correctly or not. 
    renderOrderSummary();
  });

  // afterEach function is used to write to code that can be applied after each test. In this case, after each test the original localStorage is restored. 
  afterEach(() => {
    
    // Restore the original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });

    // to clean up the HTML that is generated on the page.
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  // it funtion is used to test if the product displayed are correct. It takes two parameters: the first parameter is the name of the test (string) and the second parameter is the function where you write test code.
  it('displays the cart', () => {

    // checks if we have two of the element in the page. 
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    // checks if the first product has 2 quantity. toContain is used to check if the element contains certain things (In this case, Quantity: 2).
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    // checks if the second product has 1 quantity 
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    // checks if the name of the product is correct. 
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    // checks if the product price are displayed correctly. 
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  // it function is used to check if the products are removed correctly. 
  it('removes a product', () => {

    // using querySelector, we selected the delete link of first product. Using .click(), the delet-link of first product is clicked. 
    document.querySelector(`.js-delete-link-${productId1}`).click();
    
    // checks if there is only one product because one item has been deleted. 
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    // checks if the first product is null as it has been deleted. 
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    // checks if there is second product
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    // checks if the cart array is updated or not
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    // checks if the name of the second product is correct. 
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    // checks if the product price are displayed correctly. 
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });
});