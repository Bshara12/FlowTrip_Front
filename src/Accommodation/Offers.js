import axios from "axios";
import { useEffect, useState } from "react";
import OwnerCard from "../Component/OwnerCard";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  var token = "GHH0Sf9hfdAIATLklXEqPAEYpBHeYmugKTn9w5mWf1ecbdb6";

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/ShowOffers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOffers(res.data.offers || []);
      } catch (e) {
        console.log(e);
      }
    };
    getOffers();
  }, []);

  return (
    <div  className="owner-list-container">
      {offers.length === 0 ? (
        <div>No offers found.</div>
      ) : (
        offers.map((offer) => (
          <OwnerCard
            key={offer.id}
            name={`Room #${offer.id}`}
            location={`${offer.area} m²`}
            phoneNumber={`$${offer.price}`}
            category={`$${offer.offer_price}`}
            isUserView={false}
            onClick={() => navigate(`/room-details/${offer.id}`)}
          />
        ))
      )}
    </div>
  );
}
