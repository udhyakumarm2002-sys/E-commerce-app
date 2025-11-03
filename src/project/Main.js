// Main.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import AllMeals from './AllMeals';
import FilteredMeals from './FilteredMeals';
import Loader from './Loader';

const Main = () => {
  const [loading, setLoading] = useState(true);

  const [allMeals, setAllMeals] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [singleMeal, setSingleMeal] = useState([]);

  const [cartItem, setCartItem] = useState([]);

  // Fetch all meals
  async function getAllMeals() {
    try {
      const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
      const res = await fetch(API_URL);
      const data = await res.json();
      setAllMeals(data.meals || []);
    } catch (err) {
      console.error("getAllMeals error:", err);
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch categories
  async function getAllCategory() {
    try {
      const API_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
      const res = await fetch(API_URL);
      const categoryData = await res.json();
      setCategoryMeals(categoryData.categories || []);
    } catch (err) {
      console.error("getAllCategory error:", err);
      setCategoryMeals([]);
    }
  }

  // Fetch a sample single-meal list (Beef)
  async function getSingleMeal() {
    try {
      const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef";
      const res = await fetch(API_URL);
      const singleMealData = await res.json();
      setSingleMeal(singleMealData.meals || []);
    } catch (err) {
      console.error("getSingleMeal error:", err);
      setSingleMeal([]);
    }
  }

  useEffect(() => {
    getAllMeals();
    getAllCategory();
    getSingleMeal();
  }, []);

  return (
    <div>
      <Header />

      {!loading ? (
        <AllMeals
          allMeals={allMeals}
          cartItem={cartItem}
          setCartItem={setCartItem}
        />
      ) : (
        <Loader />
      )}

      {!loading ? (
        <FilteredMeals
          categoryMeals={categoryMeals}
          allMeals={allMeals}
          singleMeal={singleMeal}
          setSingleMeal={setSingleMeal}
          cartItem={cartItem}
          setCartItem={setCartItem}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Main;
