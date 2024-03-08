import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import {  useNavigate } from 'react-router-dom'

const CartDropDown=()=>{
  const {cartItems} = useContext(CartContext)
  const navigate = useNavigate()
  const goToNavigateHandler = ()=>{
    navigate('/checkout')

  }

  return(
    <div className='cart-dropdown-container'> 
      <div className='cart-items' >
        {cartItems.map((item)=>{
          // console.log(item)
          return(

            <CartItem key ={item.id} cartItem = {item} />
          )
        })}
        </div>
      <Button onClick = {goToNavigateHandler}>Checkout</Button>
    
    </div>
  )
}

export default CartDropDown