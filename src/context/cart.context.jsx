import {createContext, useEffect, useState} from "react";


const addCartItem = (cartItems,productToAdd) =>{ //helper function
  // see if the cartItems have productToAdd
  const existingCartItem = cartItems.find((cartItem)=>cartItem.id===productToAdd.id)
  

  //if found add 1 to the quantity
  if (existingCartItem){
    return cartItems.map((cartItem)=>
      cartItem.id===productToAdd.id
      ? {...cartItem,quantity:cartItem.quantity+1} : cartItem
    )
  }
  
  
  //else add the product and set the quantity to 1
  console.log("added new item to cart")
  return [...cartItems,{...productToAdd,quantity:1}]


}

const removeCartItem =(cartItems,cartItemToRemove) =>{ //helper function
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id)

  // if the quantity is equal to 1 remove item from the cart
  if( existingCartItem.quantity===1)
  {
    return cartItems.filter(cartItem=> cartItem.id!==cartItemToRemove.id)
  }

  //return back cartitems with the reduced quantity
  if (existingCartItem){
    return cartItems.map((cartItem)=>
      cartItem.id===cartItemToRemove.id
      ? {...cartItem,quantity:cartItem.quantity-1} : cartItem
    )
  }
}


const removeWholeItem = (cartItems,cartItemToRemove)=>{
  const existingCartItem = cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id)
  if (existingCartItem)
  {
    return cartItems.filter(cartItem=> cartItem.id!==cartItemToRemove.id)
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems:[],
  addItemToCart:() =>{},
  removeItemFromCart:()=>{},
  removeWholCartItem:()=>{},
  cartCount:0,
  cartTotal:0
})

export const CartProvider =({children})=>{
  const [isCartOpen,setIsCartOpen] = useState(false)
  const [cartItems,setCartItems] = useState([])
  const [cartCount,setCartCount] = useState(0)
  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
    setCartCount(newCartCount)
  },[cartItems])
  useEffect(()=>{
    const newTotal = cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0)
    setCartTotal(newTotal)
  },[cartItems])

  const addItemToCart =(productToAdd) =>{
    setCartItems(addCartItem(cartItems,productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove)=>{
    setCartItems(removeCartItem(cartItems,cartItemToRemove))
  }
  
  const removeWholeCartItem =(cartItemToRemove)=>{
    setCartItems(removeWholeItem(cartItems,cartItemToRemove))
  }

  const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems, removeItemFromCart, removeWholeCartItem,cartCount, cartTotal}
  return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}