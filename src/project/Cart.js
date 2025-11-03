import React, { useState } from 'react';
import './Cart.css';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [loadCheckOut, setLoadCheckOut] = useState(false)
  const [checkOutItems, setCheckOutItems] = useState([])
  const [itemPrices, setitemPrices] = useState([])

  function buyNowItemHandler(title, quantity, price) {
    if (window.confirm("Do you want to buy this")) {
      let eachItemTotalPrice = quantity * price;
      setitemPrices([...itemPrices, eachItemTotalPrice])

      setCheckOutItems([...checkOutItems, {
        title: title,
        quantity: quantity,
        price: price
      }])
    } else {
      return
    }
  }

  function CheckOutHandler() {
    setLoadCheckOut(true)
  }

  function incrementQuantity(clickedIndex) {
    let quantityChanged = props.cartItem.map((item, index) =>
      index === clickedIndex ? { ...item, quantity: item.quantity + 1 } : item)
    props.setCartItem(quantityChanged)
  }

  function decrementQuantity(clickedIndex, quantity) {
    if (quantity > 1) {
      let quantityChanged = props.cartItem.map((item, index) =>
        index === clickedIndex ? { ...item, quantity: item.quantity - 1 } : item)
      props.setCartItem(quantityChanged)
    }
  }

  function deleteCartItem(clickedIndex) {
    props.setCartItem(props.cartItem.filter((item, index) => clickedIndex != index))
  }

  const cartItemShowed = (props.cartItem || []).map((cartItem, index) => (
    <li key={index}>
      <h4>{cartItem.title}</h4>
      <img src={cartItem.image} alt={cartItem.title} />
      <h4>₹{cartItem.price * cartItem.quantity}</h4>
      <h4>Qty: {cartItem.quantity}</h4>
      <button onClick={() => { incrementQuantity(index) }}>+</button>
      <button onClick={() => { decrementQuantity(index, cartItem.quantity) }}>-</button>
      <button className='btn1' onClick={() => {
        buyNowItemHandler(cartItem.title, cartItem.quantity, cartItem.price)
      }}>buy now</button>
      <button className='btn2' onClick={() => { deleteCartItem(index) }}>Delete</button>
    </li>
  ));

  return (
    <>
      <div className='cart'>
        <ul>
          {cartItemShowed.length ? cartItemShowed : <p>No items in cart</p>}
        </ul>
        <button onClick={CheckOutHandler}>CheckOut</button>

  
        {loadCheckOut && (
          <button className="closeCartBtn" onClick={() => setLoadCheckOut(false)}>
            Close
          </button>
        )}
      </div>

      {loadCheckOut ? (
        <CheckOut
          checkOutItems={checkOutItems}
          setLoadCheckOut={setLoadCheckOut}
          itemPrices={itemPrices}
        />
      ) : ""}
    </>
  );
}

export default Cart;
