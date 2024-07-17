import {cart, removeFromCart, updateCartQuantity, updateQuantity, saveButton, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';


export function renderOrderSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    // declaring and assigning deliveryOptionId to cartItem.deliveryOptionId. cartItem is a object and deliveryOptionId is the variable inside the cartItem object.
    const deliveryOptionId = cartItem.deliveryOptionId;

    // deliveryOption has been declared and assigned.
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);



    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                Update
              </span>
              <input class = "quantity-input js-quantity-input-${matchingProduct.id} js-quantity-input" data-product-id = "${matchingProduct.id}">
              <span class = "save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}   
          </div>
        </div>
      </div>
    `;
  });

  // deliveryOptionsHTML function has been created. Two parameters matchingProduct, cartItem has been passed. The function creates the HTML for the delivery in the checkout page. We generated the HTML for it and used the function instead of HTML. 
  function deliveryOptionsHTML(matchingProduct, cartItem){

    // html has been assigned to empty string. html string will save all the HTML for delivery
    let html = '';

    // deliveryOptions array has been looped through. deliveryOption parameter has been passed, and it represents each option(object) of the array.
    deliveryOptions.forEach((deliveryOption) => {

      const dateString = calculateDeliveryDate(deliveryOption);

      // ternary operators has been used to save string in priceString. if the condition deliveryOption.priceCents equals 0 is true, 'Free' is saved in priceString, else the deliveryOption.priceCents is saved.
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // isChecked is used to check if  the options have been checked (chosen). So if the id of the deliveryOption object matched with deliveryOptionId of the product we have selected, it checks the option which has been selected, else it doesnot check.
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : '' }
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    // the function at the end returns html. 
    return html;
  }


  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // using querySelectorAll, js-delete-link is selected. This is the delete link. Using .forEach, link is assigned to each delete link. Then, using addEventListener, the click function is enabled. When the button is clicked, removedFromCart function is called from cart.js.
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        // const productId is assigned to link.dataset.productId. Dataset is used to access data attributes. 
        const productId = link.dataset.productId;
        removeFromCart(productId);

        /*
        // container is assigned to HTLM of the products that should be removed. 
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        // usinge .remove(), the HTML is being removed. 
        container.remove();

        // this changes the number above the checkout page to the total quantity of items.
        document.querySelector('.js-return-to-home-link')
          .innerHTML = updateCartQuantity() + ' items';
        */

        
        // calling renderOrderSummary(). This will regenrate all the HTML after the link delete is clicked.
        renderOrderSummary();

        // calling renderPaymentSummary(). This makes sure that when we delete the product, the HTML generated for payment section are also updated.
        renderPaymentSummary();
      });
    });

  // calling renderCheckoutHeader(). This renders the middle portion of checkout header. 
  renderCheckoutHeader();

  // using querySelectorAll selecting all items that we want to update. updateLink is a parameter that is beign passed. It represents each item that we want to update. Using, addEventListener, we assigned productId to the updateLink.dataset.productId. Dataset has been used to accessed the data attribute (data-product-id).
  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      
      const productId = updateLink.dataset.productId;

      // Using querySelector, we selected js-cart-item-container-(the id of the product that we want to update) and added a new class "is-editing-quantity". The new added class gets added beside the class that we have selected. The added class introduces new CSS and HTML (<input> <a>Save</>)
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');


      // Using querySelector, js-quantity-input-(product id) is selected. Using addEventListener, 'keydown' feature is used. 'keydown' helps us to know which key the user is clicking. event helps us to access the key using event.key. That's why even parameter was passed. Once the key matched with 'Enter', it calls saveButton() that works the same as save button.
      document.querySelector(`.js-quantity-input-${productId}`)
      .addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
          saveButton(productId);

          // calling renderPaymentSummary() so that the payment section updates as we click the enter while saving the qunatity.
          renderPaymentSummary();
        }
      });
    });
  });


  // Using querySelectorAll, we selected all save link. The save link is being looped through using forEach. The saveLink parameter used in loop represents each save link. To each saveLink, we added eventListener 'click'.
  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {

      // productId is assigned to saveLink.dataset.productId. Dataset is used to access to the data attribute (data-product-id) that stored the id of the product that we want to update and save. 
      const productId = saveLink.dataset.productId;
      
      saveButton(productId);

      // calling renderPaymentSummary(). It regenerates the HTML for payment section making sure the data we have updated changes as we click the save link.
      renderPaymentSummary();
      
    });
  });

  // Using querySelectorAll, all the js-delivery-option is selected. They are looped through and element parameter represents delivery of each product. Using, addEventListener, click is listened.
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {

      // short-hand property that has assigned the productId to element.dataset.productId and deliveryOptionId to element.dataset.deliveryOptionId. 
      const {productId, deliveryOptionId} = element.dataset;

      // updates the deliveryOptionId to the id of the option chosen.
      updateDeliveryOption(productId, deliveryOptionId);

      // calling the renderOrderSummary() inside the function renderOrderSummary() (recursion). It is done so that the delivery date updates once we click the delivery option.
      renderOrderSummary();

      // calling renderPaymentSummary. This makes sure that when we change the delivery option, the HTML generated for payment section are also updated.
      renderPaymentSummary();
    } );
  });
}
