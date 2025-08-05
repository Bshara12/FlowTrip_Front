import axios from "axios";
import { useEffect, useState } from "react";
import OwnerCard from "../Component/OwnerCard";
import Loader from "../Component/Loader";
import "./Owner.css";
import "./OwnerSearch.css";
import { useNavigate } from "react-router-dom";
import { ADMIN_SEARCH, baseURL, GET_ALL_COUNTRIES, GET_ALL_OWNER_CATEGORIES, GET_ALL_OWNERS, TOKEN } from "../Api/Api";

export default function Owner() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const token = TOKEN;

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const [ownersRes, countriesRes, categoriesRes] = await Promise.all([
          axios.get(`${baseURL}/${GET_ALL_OWNERS}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}/${GET_ALL_COUNTRIES}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}/${GET_ALL_OWNER_CATEGORIES}`),
        ]);

        setOwners(ownersRes.data.data);
        setCountries(countriesRes.data.countries || []);
        setCategories(categoriesRes.data.owners_categories || []);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []);

  const handleSearch = async (e, categoryIdParam = null) => {
    e.preventDefault();
    const categoryIdToUse = categoryIdParam !== null ? categoryIdParam : selectedCategoryId;
    if (!search && !selectedCountry && !categoryIdToUse) return;

    setLoading(true);
    setError(null);

    try {
      const body = {};
      if (search) body.name = search;
      if (selectedCountry) body.country = selectedCountry;
      if (categoryIdToUse) body.category_id = categoryIdToUse;

      const res = await axios.post(`${baseURL}/${ADMIN_SEARCH}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOwners(res.data.data || []);
    } catch (err) {
      setError("حدث خطأ أثناء البحث");
    } finally {
      setLoading(false);
    }
  };

  const reloadAllOwners = async (clearCountry = false, clearCategory = false) => {
    setLoading(true);
    setError(null);

    try {
      if (search || (selectedCountry && !clearCountry) || (selectedCategory && !clearCategory)) {
        const body = {};
        if (search) body.name = search;
        if (selectedCountry && !clearCountry) body.country = selectedCountry;
        if (selectedCategory && !clearCategory) body.category_id = selectedCategoryId;

        const res = await axios.post(`${baseURL}/${ADMIN_SEARCH}`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOwners(res.data.data || []);
      } else {
        const res = await axios.get(`${baseURL}/${GET_ALL_OWNERS}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOwners(res.data.data);
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="owner-error">{error}</div>;

  return (
    <div className="fs">
      <div className="flex">
        <div className="search-bar-modern">
          <div className="input-container">
            <input
              placeholder="Add Item"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="menu country-menu">
            <div className="item">
              <a href="#" className="link" onClick={(e) => e.preventDefault()}>
                <span>{selectedCountry || "All Countries"}</span>
              </a>
              <div className="submenu">
                <div className="submenu-item">
                  <a
                    href="#"
                    className="submenu-link"
                    onClick={async (e) => {
                      e.preventDefault();
                      setSelectedCountry("");
                      await reloadAllOwners(true, false);
                    }}
                  >
                    All Countries
                  </a>
                </div>
                {countries.map((country) => (
                  <div className="submenu-item" key={country.id}>
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={async (e) => {
                        e.preventDefault();
                        setSelectedCountry(country.name);
                        await handleSearch(e);
                      }}
                    >
                      {country.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="button" onClick={(e) => handleSearch(e)}>
            <svg viewBox="0 0 512 512" className="svgIcon">
              <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79 45.5-127C450.8 96.5 354.3 0 225.4 0S0 96.5 0 216.1s96.5 216.1 216.1 216.1c48 0 92.1-17.1 127-45.5l99.7 99.7c4.5 4.5 10.6 7 17 7s12.5-2.5 17-7c9.4-9.4 9.4-24.6 0-34zM216.1 392.2c-97.2 0-176.1-78.9-176.1-176.1S118.9 39.9 216.1 39.9s176.1 78.9 176.1 176.1-78.9 176.1-176.1 176.1z" />
            </svg>
          </button>
        </div>

        <div className="menu country-menu">
          <div className="item">
            <a href="#" className="link" onClick={(e) => e.preventDefault()}>
              <span>{selectedCategory || "All Category"}</span>
            </a>
            <div className="submenu">
              <div className="submenu-item">
                <a
                  href="#"
                  className="submenu-link"
                  onClick={async (e) => {
                    e.preventDefault();
                    setSelectedCategory("");
                    setSelectedCategoryId("");
                    await reloadAllOwners(false, true);
                  }}
                >
                  All Category
                </a>
              </div>
              {categories.map((category) => (
                <div className="submenu-item" key={category.id}>
                  <a
                    href="#"
                    className="submenu-link"
                    onClick={async (e) => {
                      e.preventDefault();
                      setSelectedCategory(category.name);
                      setSelectedCategoryId(category.id);
                      await handleSearch(e, category.id);
                    }}
                  >
                    {category.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="owner-list-container">
        {owners.map((item, idx) => (
          <OwnerCard
            key={item.owner.id}
            name={item.user.name}
            location={item.owner.location}
            phoneNumber={item.user.phone_number}
            category={item.category}
            isUserView={true}
            style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            onClick={() => navigate(`/owner_details/${item.owner.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
