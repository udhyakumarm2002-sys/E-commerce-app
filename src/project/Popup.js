// Popup.js
import React from 'react';
import './Popup.css';

const Popup = (props) => {
  const ShowedPopUp = (props.properties || []).map((mealItem, index) => (
    <li className="popupitem" key={index}>
      <h4>{mealItem.strMeal}</h4>
      <img src={mealItem.strMealImage} style={{ height: 200, borderRadius: '10px' }} alt={mealItem.strMeal} />
      <h3>Ingredients:</h3>
      <p>{mealItem.strIngredient1}</p>
      <p>{mealItem.strIngredient2}</p>
      <p>{mealItem.strIngredient3}</p>
      <h2 style={{ color: "red" }}>Price: ₹{mealItem.price}</h2>

      <div className="popup-buttons">
        <button onClick={() => props.cartFunction(mealItem.strMeal, mealItem.strMealImage, mealItem.price)}>Order Now</button>
        <button className="cancel-btn" onClick={props.onClose}>Cancel</button>
      </div>
    </li>
  ));

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={props.onClose}>X</button>
        {ShowedPopUp}
      </div>
    </div>
  );
};

export default Popup;
