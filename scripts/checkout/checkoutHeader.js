import {updateCartQuantity} from "../../data/cart.js";

export function renderCheckoutHeader(){
  const totalProductQuantity = updateCartQuantity();

  let checkoutHeaderHTML = 
  `
  Checkout (<a class="return-to-home-link js-return-to-home-link"
          href="amazon.html">${totalProductQuantity} items</a>)

  `
  document.querySelector('.js-checkout-header-middle-section').innerHTML = checkoutHeaderHTML;
}