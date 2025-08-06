import axios from "axios";
import { useEffect, useState } from "react";
import OwnerCard from "../Component/OwnerCard";
import { useNavigate } from "react-router-dom";
import Loader from "../Component/Loader";


export default function Offers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading,setLoading] = useState(true);
  var token = "bOJYVAykGuPS02EwMu3KndnhrJ2Ff6t6yMP1uE9O68ab63f0";

  useEffect(() => {
    const getOffers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/ShowOffers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOffers(res.data.offers || []);
      } catch (e) {
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    };
    getOffers();
  }, []);

  return loading ? <Loader/> : (
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
