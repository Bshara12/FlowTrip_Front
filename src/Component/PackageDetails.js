import React from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { id } = useParams();

  // بيانات وهمية
  const packageData = {
    companyName: "Wanderlust Tours",
    description: "Experience the most beautiful corners of Paris with our guided tours.",
    price: 299,
    elements: [
      {
        id: 1,
        name: "Eiffel Tower",
        type: "Attraction",
        description: "Visit the iconic Eiffel Tower with priority access.",
        pictures: [
          "https://images.unsplash.com/photo-1543340713-8df4c6132c8a",
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f"
        ]
      },
      {
        id: 2,
        name: "Louvre Museum",
        type: "Museum",
        description: "Discover the world-famous art inside the Louvre.",
        pictures: [
          "https://images.unsplash.com/photo-1529429611279-4d6d2a47d0c7"
        ]
      }
    ]
  };

  const allPictures = packageData.elements.flatMap((el) => el.pictures);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="packageDetailsContainer">
      <Slider {...sliderSettings} className="packageSlider">
        {allPictures.map((pic, index) => (
          <div key={index}>
            <img src={pic} alt={`slide-${index}`} className="sliderImage" />
          </div>
        ))}
      </Slider>

      <div className="packageInfo">
        <h1 className="companyName">{packageData.companyName}</h1>
        <p className="description">{packageData.description}</p>
        <p className="price">${packageData.price}</p>
      </div>

      <div className="elementsSection">
        <h2 className="elementsTitle">What's Included</h2>
        <div className="elementsList">
          {packageData.elements.map((el) => (
            <div
              key={el.id}
              className="elementCard"
              onClick={() => alert(`Go to detail of ${el.name}`)}
            >
              <img src={require("../Assets/paris.jpeg")} alt={el.name} className="elementImage" />
              <div className="elementContent">
                <h3>{el.name}</h3>
                <p className="elementType">{el.type}</p>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bookingFooter">
        <div data-tooltip={`Price:-$${packageData.price}`} className="buttonpriceanimation">
          <div className="button-wrapperpriceanimation">
            <div className="textpriceanimation">Buy Now</div>
            <span className="iconpriceanimation">
              <svg
                viewBox="0 0 16 16"
                className="bi bi-cart2"
                fill="currentColor"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
