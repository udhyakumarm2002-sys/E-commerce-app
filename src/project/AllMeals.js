// AllMeals.js
import React, { useState } from 'react';
import './AllMeals.css';
import Popup from './Popup';
import Cart from './Cart';

const AllMeals = (props) => {
  const [popUp, setPopUp] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // price list (you can add more meals)
  const priceList = {
    "Chicken Enchilada Casserole": 220,
    "Chocolate Gateau": 180,
    "Cream Cheese Tart": 240,
    "Christmas Pudding Flapjack": 260,
    "Chicken Handi": 180,
    "Chicken Alfredo Primavera": 150,
    "Chicken Fajita Mac and Cheese": 230,
    "Cajun spiced fish tacos": 170
  };

  function popUPFunction(mealItem) {
    setProperties([{
      strMeal: mealItem.strMeal,
      strMealImage: mealItem.strMealThumb,
      strIngredient1: mealItem.strIngredient1,
      strIngredient2: mealItem.strIngredient2,
      strIngredient3: mealItem.strIngredient3,
      price: mealItem.price,
    }]);
    setPopUp(true);
  }

  function cartFunction(title, image, price) {
    props.setCartItem([
      ...props.cartItem,
      {
        title,
        image,
        price,
        quantity: 1
      }
    ]);
    setShowCart(true);
    setPopUp(false);
  }

  const allMealsWithPrice = (props.allMeals || []).map(meal => ({
    ...meal,
    price: priceList[meal.strMeal] || 200 // default price if not found
  }));


  const showSpecialMeals = allMealsWithPrice.map((mealItem, index) => {
    if (index <= 7) {
      return (
        <li key={index} onClick={() => popUPFunction(mealItem)}>
          <img src={mealItem.strMealThumb} alt={mealItem.strMeal} />
          <h2>{mealItem.strMeal}</h2>
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <div className='all-meals-container'>
        <h1>All Meals</h1>
        <ul>{showSpecialMeals}</ul>
      </div>

      {/* Popup for details */}
      {popUp && (
        <Popup
          properties={properties}
          onClose={() => setPopUp(false)}
          cartFunction={cartFunction}
        />
      )}

    
      {showCart && <Cart cartItem={props.cartItem} 
      setCartItem = {props.setCartItem}
      
      
      />}
    </>
  );
};

export default AllMeals;
