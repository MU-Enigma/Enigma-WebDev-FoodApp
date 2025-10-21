import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { formatPrice } from '../utils/cartUtils';
import ShinyText from './shiny-text/ShinyText.jsx';

const MealCard = ({ meal }) => {
  const { addItem } = useContext(CartContext);
  
  const formattedPrice = formatPrice(meal.price);
  
  function handleAddToCart() {
    addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>
            <ShinyText 
              text={meal.name} 
              disabled={false} 
              speed={3} 
              className="meal-name-shiny"
            />
          </h3>
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </p>
      </article>
    </li>
  );
}

export default MealCard;
