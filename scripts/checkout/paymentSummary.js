import {cart, updateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';

// renders the payment section of checkout page.
export function renderPaymentSummary(){

  // assigning totalProductQuantity to updateCartQuantity() (it is function that calculates the total products in the cart).
  const totalProductQuantity = updateCartQuantity();

  // productPriceCentsa and shippingPriceCents are accumulator.
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  // cart array has been imported. The array is looped through. cartItem parameter represents each cart item (object). 
  cart.forEach((cartItem) => {

    // product (object) is assigned to getProduct(cartItem.productId). getProduct() function gives the product(object) that has been kept in the cart.
    const product = getProduct(cartItem.productId);

    // calculates the total product price.
    productPriceCents += product.priceCents * cartItem.quantity;

    // deliveryOption (object) is assigned to getDeliveryOption(cartItem.deliveryOptionId). getDeliveryOption() function gives the delivery option (obejct) that has been chosen.
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    // calcutes the shipping price
    shippingPriceCents += deliveryOption.priceCents;

  }) ;

  // calcuates total before tax (in cents)
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents; 

  // calculates tax (in cents)
  const taxCents = totalBeforeTaxCents * 0.1;

  // calculates total (in cents)
  const totalCents = totalBeforeTaxCents + taxCents;

  // paymentSummaryHTML is assigned to HTML of payment-summary.
  const paymentSummaryHTML = `

    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalProductQuantity}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    </div>
    
  `
  // using querySelctor, payment-summary is chosen. Using innerHTML, new HTML is generated i.e, paymentSummaryHTML.
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}