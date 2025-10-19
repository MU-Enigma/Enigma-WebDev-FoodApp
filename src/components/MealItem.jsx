import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);

  const formattedPrice = `$${parseFloat(meal.price).toFixed(2)}`;

  function handleAddToCart() {
    addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}