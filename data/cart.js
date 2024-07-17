// Using localStorage.getItem(), the items saved in 'cart' is accessed. Since, the data that was stored was string before, JSON.parse() was used to make it array again. When there is no product saved in the cart, a default value is given.
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];

  function saveToStorage(){
    // localStorage helps us to save the data. The data remains in the webpage even after refresh. The data of cart is saved in 'cart' variable. Since, localStorage only accepts strings, JSON.stringify is used to make the cart array string. 
    localStorage.setItem('cart', JSON.stringify(cart));
  };

export function addToCart(productId){

  // quantitySelector has been declared and assigned. querySelector is used to select quantity-selector. Product id is used so that each items are unique from others. .value is used to get the value from the selector. Since, the values we get from DOM are string by default, Number() is used to convert them into integers.
  let quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
  // matchingItem has been declared not assigned. 
  let matchingItem;

  // this loops checks if the item is already in the cart or not. If it is, it just increases the quantity. If it is not in the cart, the loop adds the produc id and quantity (object) in the cart (array). deliveryOptionId is also added. This id could be used to get the deliveryDays and price from deliveryOptions array.
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantitySelector;
  } else{
    cart.push({
      productId,
      quantity: quantitySelector,
      deliveryOptionId: '1'
    });
  }
  
  // saveToStorage function is being called as when the products are added, the cart updates. And this function helps to save the data.
  saveToStorage();
}

export function removeFromCart(productId){
  
  // newCart array is assigned and declared to empty array. This is so that when the item is removed from cart, the unremoved items are pushed into this new cart.
  const newCart = [];
  
  // forEach loop is used to loop through cart array. If the cartItem's product id doesn't match with the product id of the item removed, the cart item is pushed into newCart.
  cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  // cart Array is equaled to newCart because now the newCart contains all the unremoved cart.
  cart = newCart;

  // saveToStorage function is being called as when the products are removed, the cart updates. And this function helps to save the data.
  saveToStorage();
}

// updateCartQuantity() calculates the total number of items in a cart and returns cartQuantity that has the value. It is being exported. 
export function updateCartQuantity(){

  // cartQuanatity is assigned and declared. It calculates the total number of quantity.
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

// the function is used to update the quantity of the product that we have chosen to update to its new quantity.
export function updateQuantity(productId, newQuantity){

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

export function saveButton(productId){

  // newQuantity is assigned to the value clicked on 'js-quantity-input-(id of the product chosen)'. .value is used to acquire the value from <input> and Number() is used to convert the string into number. 
  let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

  // input validation for the new quantity to be within 0-1000.
  if (newQuantity < 1000 && newQuantity >= 0){

    // updates the quantity of the product to new quantity
    updateQuantity(productId, newQuantity);

    // updated the HTML of Quantity: (newQuantity)
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

    // The quantity of items are updated in the header of checkout page.
    document.querySelector('.js-return-to-home-link')
    .innerHTML = updateCartQuantity() + ' items';
  }

  // At the end, the class that was added when the update button was clikced gets removed. The class gets removed when the save button is clicked. That means the CSS and HTML changes back to default.
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
}

export function updateDeliveryOption(productId, deliveryOptionId){

  // this to access the product kept in the cart. matchingItem will be the object of the  product that is in the cart. 
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  // updating the matchingItem.deliveryOptionId to the deliveryOptionId. deliveryOptionId is the id of the delivery option that is selected.
  matchingItem.deliveryOptionId = deliveryOptionId;

  // saves the id in the cart.
  saveToStorage();
}