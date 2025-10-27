import { useState, useEffect } from "react";
import MealCard from "./Meal-card.jsx";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    }

    fetchMeals();
  }, []);

if (isLoading) {
  return (
    <div className="center spinner-container">
      <div className="spinner"></div>
      <p style={{ color: "#bfa94a", marginTop: "0.5rem" }}>Fetching meals...</p>
    </div>
  );
}



  if (error) {
    return (
      <div className="center error">
        <h2>Oops! Could not load meals.</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loadedMeals.length === 0) {
    return <p className="center">No meals available right now 😞</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
