import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// the function renderProductsGrid is known as a callback. Callback is a function to run in the future. 
loadProducts(renderProductsGrid);

function renderProductsGrid(){

  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class = "js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id = "${product.id}">
        Add to Cart
      </button>
    </div>
    `;
  });

  // selecting the products-grid and showing the grid with new items using innerHTML.
  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  // addedMessageTimeouts is declared and assigned empty. It is an object that stores timeout id returned by setTimeout. 
  const addedMessageTimeouts = {};

  function visibleAddedMessage(productId){
    // using querySelector to select added-to-cart class, and using classList another class is added. In CSS, the added class has been given features and opacity of 1 so that the message pops up when the button is clicked.
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-message');

    // previousTimeoutId is assigned and declared to key (productId) of addedMessageTimeouts. Although the addedMessageTimeouts is empty, product id is used as key to access data of addedMessagetimeout. 
    const previousTimeoutId = addedMessageTimeouts[productId];

    // Using if statement to check if there is previousTimoutId, and if there is then, it is cleared out.
    if (previousTimeoutId){
      clearTimeout(previousTimeoutId);
    }

    // Using setTimeout and classList.remove() the added class was removed after 2s, so that the pop up message disappears right after 2 second. Assigning it to timeoutId
    const timeoutId = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-message');
    }, 2000);

    // addedMessageTimeouts[productId] is assigned to timeoutId (the id which is returned by set timeout). So, at the end, productId is just used as a key to access the data of the object.
    addedMessageTimeouts[productId] = timeoutId;

  }

  // this changes the number above the cart to the total quantity of items and shows the HTML of the cart quantity.
  document.querySelector('.js-cart-quantity')
  .innerHTML = updateCartQuantity();

  // selecting all add-to-cart button as when products are added in the website there will be more add-to-cart button. querySelectorAll help us select all those buttons. Using forEach loop the all the buttons are looped through. button parameter is passed which indicates the button element. 
  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      // dataset is used to access the data attributes of the elemet. producId is the camel case of data-product-id (kebab case). 
      const {productId} = button.dataset; 

      visibleAddedMessage(productId);

      addToCart(productId);

      // this changes the number above the cart to the total quantity of items and shows the HTML too.
      document.querySelector('.js-cart-quantity')
      .innerHTML = updateCartQuantity();   
    });
  });
}





