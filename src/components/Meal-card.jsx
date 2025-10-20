import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

const MealCard = ({ meal }) => {
  // ✅ ADD: Get cart context
  const { addItem } = useContext(CartContext);

  // ✅ ADD: Format price properly
  const formattedPrice = `$${parseFloat(meal.price).toFixed(2)}`;

  // ✅ ADD: Handle add to cart
  function handleAddToCart() {
    addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          {/* ✅ CHANGE: Use formatted price */}
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* ✅ ADD: onClick handler */}
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </p>
      </article>
    </li>
  );
};

export default MealCard;