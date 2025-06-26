import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ title = "test" }) => {
  return (
    <div className="CategoryCard-cards">
      <figure className="CategoryCard-card">
        <figcaption className="CategoryCard-card_title">{title}</figcaption>
      </figure>
    </div>
  );
};

export default CategoryCard;
