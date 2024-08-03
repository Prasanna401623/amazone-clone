import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js';
//import '../data/backend-practice.js';

// loadProducts has been imported and given an function as parameter. The arrow function has two more functions. What this does is, it runs loadProducts() first and within the loadProducs there is function that has been used as parameter. The arrow function will be used in place of that function. 
loadProducts(() => {
// calling renderOrderSummary()
renderOrderSummary();

renderPaymentSummary();
})
