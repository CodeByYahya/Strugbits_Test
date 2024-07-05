import React from 'react';
import './MealsCard.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon

const MealsCard = ({ recipe, onSelect,onDelete }) => {
  const {
    id,
    name,
    ingredients,
    instructions,
    cuisine,
    image,
    rating,
    servings,
    difficulty,
    caloriesPerServing,
  } = recipe;

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="card-rating d-flex align-items-center">
        {Array(fullStars).fill(<FaStar className="text-warning" key="full-star" />)}
        {halfStar && <FaStarHalfAlt className="text-warning" key="half-star" />}
        {Array(emptyStars).fill(<FaRegStar className="text-warning" key="empty-star" />)}
        <AiOutlineDelete className="delete-icon ms-auto text-danger" onClick={(e) => { e.stopPropagation(); onDelete(id); }} />
      </div>
    );
  };

  return (
    <div className="card meals-card" onClick={onSelect}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{`${servings} servings | ${caloriesPerServing} calories per serving`}</p>
        <p className="card-text">{`Difficulty: ${difficulty}`}</p>
        <p className="card-text">{`Cuisine: ${cuisine}`}</p>
        {renderStars()}
      </div>
    </div>
  );
};

export default MealsCard;
