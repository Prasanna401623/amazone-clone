import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
//import '../data/backend-practice.js';

// async makes a function return a promise. await is used to let us wait for promise to finish. try and catch is used to handle errors. 
async function loadPage(){

  try{

    //throw 'error1';

    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      //throw 'error2'
      loadCart(() => {
        //reject('error3');
        resolve();
      });
    });
  }
  catch(error){
    console.log('Unexpected error. Please try again later');
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
// Promise is a class. When we creat promise,we need to give it a function. It runs the inner function immediately. That means loadProducts runs immediately. resolve is similar to done(). Once the resolve is used, the next step will run. To run the next step, we will use then(). then() takes a function as a parameter. 
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
// loadProducts has been imported and given an function as parameter. The arrow function has two more functions. What this does is, it runs loadProducts() first and within the loadProducs there is function that has been used as parameter. The arrow function will be used in place of that function. 
loadProducts(() => {
  // calling renderOrderSummary()
  renderOrderSummary();

  renderPaymentSummary();
})
*/