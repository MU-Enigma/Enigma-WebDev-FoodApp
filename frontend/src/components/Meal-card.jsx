import { memo } from "react";
import { useCart } from "../store/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "";

const MealCard = ({ meal }) => {
  const { addItem } = useCart();

  if (!meal || !meal.id) {
    console.error("Invalid meal data:", meal);
    return null;
  }

  const handleAddToCart = () => {
    addItem(meal);
    console.log("Added to cart:", meal.name);
  };

  const getImageSrc = () => {
    if (!meal.image) return '/placeholder-meal.jpg';
    if (/^https?:\/\//i.test(meal.image)) return meal.image;
    const prefix = API_URL ? API_URL.replace(/\/$/, '') : '';
    return prefix ? `${prefix}/${meal.image.replace(/^\/+/, '')}` : `/${meal.image.replace(/^\/+/, '')}`;
  };

  return (
    <li className="meal-item">
      <article>
        <img
          src={getImageSrc()}
          alt={meal.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-meal.jpg';
          }}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            ${typeof meal.price === 'number' ? meal.price.toFixed(2) : meal.price}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button 
            className="button"
            onClick={handleAddToCart}
            aria-label={`Add ${meal.name} to cart`}
          >
            Add to Cart
          </button>
        </p>
      </article>
    </li>
  );
};

export default memo(MealCard);
