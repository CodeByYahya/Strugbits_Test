/* eslint-disable react/prop-types */

import './MealsCard.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon

const MealsCard = ({ recipe, onSelect, onDelete }) => {
  const {
    id,
    name,
    instructions,
    cuisine,
    image,
    rating,
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
      </div>
    );
  };

  const truncateInstructions = (instructions) => {
    const combinedInstructions = instructions.join('. ') + '.';
    return combinedInstructions.length > 90
      ? combinedInstructions.substring(0, 90) + '...'
      : combinedInstructions;
  };

  return (
    <div className="card meals-card" onClick={onSelect} data-aos="zoom-in-down">
      <div className="position-relative">
        <img src={image} className="card-img-top" alt={name} />
        <AiOutlineDelete
          className="position-absolute top-0 end-0 m-2 text-danger delete-icon"
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {name.length > 20 ? `${name.substring(0, 20).split(' ').slice(0, -1).join(' ')}...` : name}
        </h5>
        <p className="card-text">
          {truncateInstructions(instructions)}
        </p>
        <p className="card-text">{`Cuisine: ${cuisine}`}</p>
        {renderStars()}
      </div>
    </div>
  );
};

export default MealsCard;
