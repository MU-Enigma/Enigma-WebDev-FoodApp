import { useState, useEffect } from 'react';
import Header from './components/Header';
import MealItem from './components/MealItem';
import Cart from './components/Cart';

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:3000/meals');
        
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  function handleShowCart() {
    setShowCart(true);
  }

  function handleHideCart() {
    setShowCart(false);
  }

  function handleOpenCheckout() {
    // TODO: Implement checkout modal
    console.log('Opening checkout...');
    setShowCart(false);
  }

  return (
    <>
      <Header onShowCart={handleShowCart} />
      <main>
        {isLoading && <p className="center">Loading meals...</p>}
        {error && <p className="center error">Error: {error}</p>}
        {!isLoading && !error && meals.length > 0 && (
          <ul id="meals">
            {meals.map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
          </ul>
        )}
      </main>
      {showCart && (
        <Cart onClose={handleHideCart} onOpenCheckout={handleOpenCheckout} />
      )}
    </>
  );
}

export default App;