import React from 'react'
import './CheckOut.css'

const CheckOut = (props) => {

  function CheckOutClose() {
    props.setLoadCheckOut(false);
  }

  let totalPrice = props.itemPrices.reduce((acc, item) => {
    return acc + item;
  }, 0);

  console.log("check", props.itemPrices);

  return (
    <div className='checkout'>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Item Price</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
          {props.checkOutItems.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}

          <tr className="total-row">
            <td colSpan="3">Total Amount</td>
            <td>₹{totalPrice}</td>
          </tr>
        </tbody>
      </table>

      <button className='btn3' onClick={CheckOutClose}>Close</button>
    </div>
  )
}

export default CheckOut;
