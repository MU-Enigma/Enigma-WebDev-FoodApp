import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

const MealCard = ({ meal }) => {
  // MY ADDITION: Cart functionality
  const { addItem } = useContext(CartContext);
  
  // MY ADDITION: Format price
  const formattedPrice = `$${parseFloat(meal.price).toFixed(2)}`;
  
  // MY ADDITION: Handle add to cart
  function handleAddToCart() {
    addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          {/* MY CHANGE: Use formatted price */}
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* MY CHANGE: Add onClick handler */}
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </p>
      </article>
    </li>
  );
}

export default MealCard;