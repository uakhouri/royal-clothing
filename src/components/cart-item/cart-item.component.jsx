import "./cart-item.styles.scss"

const CartItem = (CartItem) => {
  
  const { name, imageUrl, price, quantity } = CartItem.cartItem

  return (

    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span>

          {name}
        </span>

        <span>{quantity}x${price}</span>
      </div>
    </div>
  )


}

export default CartItem