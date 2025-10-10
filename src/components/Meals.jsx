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
          // A 404(or anything similar) response is truthy, so check .ok to catch HTTP errors.
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
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error!</h2>
      </div>
    );
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
