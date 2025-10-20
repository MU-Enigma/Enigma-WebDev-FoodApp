import ShinyText from './shiny-text/ShinyText.jsx';

const MealCard = ({ meal }) => {
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
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button">Add to Cart</button>
        </p>
      </article>
    </li>
  );
}

export default MealCard;