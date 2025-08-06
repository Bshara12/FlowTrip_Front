import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PackageDetails.css";
import { useNavigate } from "react-router-dom";
import { baseURL, GET_PACKAGE, TOKEN } from "../Api/Api";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
      const token = TOKEN;

  const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836"; 
const navigate = useNavigate();
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`${baseURL}/${GET_PACKAGE}/${id}`, {
          headers: {
          Authorization: `Bearer ${token}`,
          }
        });
        if (res.data && res.data.data) {
          setPackageData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching package details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!packageData) return <p>Package not found</p>;

  const allPictures = packageData.package_element.flatMap((el) =>
    el.package_element_picture.length > 0
      ? el.package_element_picture.map((p) => p.picture_path)
      : [fallbackImage]
  );

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
        <h1 className="companyName">{packageData.tourism_company.company_name}</h1>
        <p className="description">{packageData.discription}</p>
        <p className="price">${packageData.total_price}</p>
        {packageData.payment_by_points === 1 && (
          <p className="price">Also available with points</p>
        )}
      </div>

      <div className="elementsSection">
        <h2 className="elementsTitle">What's Included</h2>
        <div className="elementsList">
          {packageData.package_element.map((el) => (
            <div
              key={el.id}
              className="elementCard"
              onClick={() => navigate("/element-details", { state: { element: el } })}
            >
              <img
                src={
                  el.package_element_picture.length > 0
                    ? el.package_element_picture[0].picture_path
                    : fallbackImage
                }
                alt={el.name}
                className="elementImage"
              />
              <div className="elementContent">
                <h3>{el.name}</h3>
                <p className="elementType">{el.type}</p>
                <p>{el.discription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bookingFooter">
        <div
          data-tooltip={`Price: $${packageData.total_price}`}
          className="buttonpriceanimation"
        >
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
