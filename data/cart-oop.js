// Object Oriented Programming have been used here. All the codes have been copied from cart.js and pasted here. Then, the functions are saved as different objects. That's why it is called object oriented programming. At the end, new function Cart has been created so that we can create other carts using that function (for example: business cart).  In object oriented programmming, PascalCase are used for naming things that generate objects. 

function Cart(localStorageKey){
  const cart = {

    cartItems: undefined,
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    },
  
    saveToStorage(){
      
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
  
    removeFromCart(productId){
    
      const newCart = [];
      
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId != productId){
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
    updateCartQuantity(){
  
      let cartQuantity = 0;
  
      this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
      });
  
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity){
  
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId){
          cartItem.quantity = newQuantity;
        }
      });
  
      this.saveToStorage();
    },
  
    saveButton(productId){
  
      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    
      if (newQuantity < 1000 && newQuantity >= 0){
    
        this.updateQuantity(productId, newQuantity);
    
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    
        document.querySelector('.js-return-to-home-link')
        .innerHTML = updateCartQuantity() + ' items';
      }
    
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    },
  
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
  };

  return cart;
}

const cart = Cart('cart-opp');

const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
