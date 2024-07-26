// class are used to generate objects. Class have methods and properties. One of the method is constructor which is used to create many objects. 

// the codes have been copied from cart-oop and pasted here. In oop, the codes were saved in a function to generate objects but here the codes are inside class to generate objects. It is much cleaner way of coding. The features like constructor makes class better than function to generate objects. 

class Cart {

  cartItems;
  #localStorageKey; // private property (# makes it private)

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); // private methods
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }

  saveToStorage(){
      
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId){
  
    let quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += quantitySelector;
    } else{
      this.cartItems.push({
        productId,
        quantity: quantitySelector,
        deliveryOptionId: '1'
      });
    }
    
    this.saveToStorage();
  }

  removeFromCart(productId){
    
    const newCart = [];
    
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId != productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  updateCartQuantity(){
  
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity){
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId){
        cartItem.quantity = newQuantity;
      }
    });

    this.saveToStorage();
  }

  saveButton(productId){
  
    let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  
    if (newQuantity < 1000 && newQuantity >= 0){
  
      this.updateQuantity(productId, newQuantity);
  
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
  
      document.querySelector('.js-return-to-home-link')
      .innerHTML = updateCartQuantity() + ' items';
    }
  
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
  }

  updateDeliveryOption(productId, deliveryOptionId){
  
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(!matchingItem){
      return;
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

}

const cart = new Cart('cart-opp');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
