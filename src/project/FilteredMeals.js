// FilteredMeals.js
import React, { useState } from 'react';
import './FilterMeals.css';
import Pagination from './Pagination';
import Popup from './Popup';
import Cart from './Cart';

const FilteredMeals = (props) => {
  const [filteredMeals, setFilteredMeals] = useState([]); // array of meal objects
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [mealsPerPage, setMealsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // price list (expanded list you supplied)
  const priceList = {
    "Corned Beef and Cabbage": 280,
    "Cevapi Sausages": 300,
    "Croatian lamb peka": 290,
    "Croatian Bean Stew": 280,
    "Chivito uruguayo": 270,
    "Corned Beef Hash": 285,
    "Chicken Enchilada Casserole": 280,
    "Chicken Handi": 380,
    "Chicken Alfredo Primavera": 285,
    "Chicken Fajita Mac and Cheese": 260,
    "Crock Pot Chicken Baked Tacos": 220,
    "Chicken Karaage": 180,
    "Coq au vin": 285,
    "Chicken & mushroom Hotpot": 280,
    "Chicken Couscous": 170,
    "Chicken Ham and Leek Pie": 190,
    "Chicken Parmentier": 240,
    "Chicken Marengo": 230,
    "Chicken Basquaise": 290,
    "Chicken Congee": 300,
    "Chicken Quinoa Greek Salad": 340,
    "Chick-Fil-A Sandwich": 270,
    "Chocolate Gateau": 260,
    "Christmas Pudding Flapjack": 220,
    "Chocolate Avocado Mousse": 210,
    "Choc Chip Pecan Pie": 200,
    "Chocolate Raspberry Brownies": 280,
    "Carrot Cake": 290,
    "Chelsea Buns": 270,
    "Chocolate Souffle": 380,
    "Chinon Apple Tarts": 300,
    "Canadian Butter Tarts": 200,
    "Chocolate Caramel Crispy": 150,
    "Cashew Ghoriba Biscuits": 180,
    "Classic Christmas pudding": 275,
    "Christmas Pudding Trifle": 255,
    "Christmas cake": 310,
    "Callaloo Jamaican Style": 300,
    "Chakchouka": 280,
    "Chilli prawn linguine": 285,
    "Crispy Sausages and Greens": 240,
    "Coddled pork with cider": 220,
    "Cajun spiced fish tacos": 200,
    "Corba": 290,
    "Cream Cheese Tart": 340,
    "Clam chowder": 320,
    "Creamy Tomato Soup": 190,
    "Chickpea Fajitas": 210,
    "Crispy Eggplant": 280,
    "Cabbage Soup (Shchi)": 230
  };

  // pagination indexes
  const lastIndex = mealsPerPage * currentPage;
  const firstIndex = lastIndex - mealsPerPage;
  const showMealsPerPage = filteredMeals.slice(firstIndex, lastIndex);

  function popUPFunction(meal) {
    const price = priceList[meal.strMeal] || 200;
    setProperties([{
      strMeal: meal.strMeal,
      strMealImage: meal.strMealThumb,
      strIngredient1: meal.strIngredient1,
      strIngredient2: meal.strIngredient2,
      strIngredient3: meal.strIngredient3,
      price
    }]);
    setPopUp(true);
  }

  function filteredCategoryHandler(clickedCategory) {
    props.setSingleMeal([]);
    setActiveCategory(clickedCategory);

  
    const filteredMealsData = (props.allMeals || []).filter(
      mealItem => mealItem.strCategory === clickedCategory
    ).map(meal => ({ ...meal, price: priceList[meal.strMeal] || 200 }));

    setFilteredMeals(filteredMealsData);
    setCurrentPage(1);
  }

  // cart function (adds to parent cart)
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

  const showCategoryMeals = (props.categoryMeals || []).map((categoryItem, idx) => (
    <button
      key={idx}
      className={`${categoryItem.strCategory === activeCategory ? "active" : ""}`}
      onClick={() => filteredCategoryHandler(categoryItem.strCategory)}
    >
      {categoryItem.strCategory}
    </button>
  ));

  const singleMealData = (props.singleMeal || []).slice(0, 8).map((singleMealItem, index) => (
    <li key={index} onClick={() => popUPFunction(singleMealItem)}>
      <img src={singleMealItem.strMealThumb} alt={singleMealItem.strMeal} />
      <h4>{singleMealItem.strMeal}</h4>
    </li>
  ));

  const displayMeals = showMealsPerPage.length
    ? showMealsPerPage.map((mealItem, index) => (
        <li key={index} onClick={() => popUPFunction(mealItem)}>
          <img src={mealItem.strMealThumb} alt={mealItem.strMeal} />
          <h2>{mealItem.strMeal}</h2>
        </li>
      ))
    : null;

  return (
    <>
      <div>
        <h1 className='filteredMealsH1'>Select your favourite food</h1>
        <div className='category'>
          {showCategoryMeals}

          <ul className='categoryItem'>
            {singleMealData}
          </ul>

          <ul className='categoryItem'>
            {singleMealData.length !== 0 || filteredMeals.length !== 0
              ? displayMeals
              : <div className='alert'>
                  <h3>Sorry... no item found</h3>
                  <h4>Choose another item</h4>
                </div>}
          </ul>
        </div>
      </div>

      <div>
        <Pagination
          filteredMeals={filteredMeals}
          mealsPerPage={mealsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

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

export default FilteredMeals;
