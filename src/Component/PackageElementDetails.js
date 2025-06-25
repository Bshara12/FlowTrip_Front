import React from "react";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PackageElementDetails.css";

const PackageElementDetails = () => {
  const { state } = useLocation();
  const element = state?.element;

  const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (!element) return <p>Element not found</p>;

  return (
    <div className="elementDetailsContainer">
      <Slider {...sliderSettings} className="elementSlider">
        {element.package_element_picture.length > 0
          ? element.package_element_picture.map((pic, index) => (
              <div key={index}>
                <img
                  src={pic.picture_path}
                  alt={`slide-${index}`}
                  className="sliderImage"
                />
              </div>
            ))
          : (
              <div>
                <img
                  src={fallbackImage}
                  alt="fallback"
                  className="sliderImage"
                />
              </div>
            )}
      </Slider>

      <div className="elementInfo">
        <h1>{element.name}</h1>
        <p><strong>Type:</strong> {element.type}</p>
        <p>{element.discription}</p>
      </div>
    </div>
  );
};

export default PackageElementDetails;
