import { useState, useEffect, useMemo } from "react";
import MealCard from "./Meal-card.jsx";

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMeals() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}/meals`, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch meals. Status: ${response.status}`);
        }

        const meals = await response.json();
        
        if (!Array.isArray(meals)) {
          throw new Error("Invalid data format received from server.");
        }
        
        setLoadedMeals(meals);
      } catch (error) {
        // Don't set error if request was aborted
        if (error.name !== 'AbortError') {
          console.error("Error fetching meals:", error);
          setError(error.message || "Something went wrong! Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, []);

  // Memoize meal cards for performance
  const mealCards = useMemo(() => {
    return loadedMeals.map((meal) => (
      <MealCard key={meal.id} meal={meal} />
    ));
  }, [loadedMeals]);

  if (isLoading) {
    return (
      <div className="center">
        <p>Fetching meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error center">
        <h2>Error!</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="button"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loadedMeals.length === 0) {
    return (
      <div className="center">
        <p>No meals available at the moment.</p>
      </div>
    );
  }

  return (
    <ul id="meals">
      {mealCards}
    </ul>
  );
};

export default Meals;
