import { useEffect, useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Admin/OwnerSearch.css";
import "./AccommodationFilter.css";
import SaveButton from "../Component/SaveButton";
import {
  baseURL,
  TOKEN,
  GET_ALL_COUNTRIES,
  GET_ALL_ACCOMMODATION_TYPES,
} from "../Api/Api";

const token = TOKEN;

export default function AccommodationFilter({ onSearch }) {
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTypeName, setSelectedTypeName] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [guests, setGuests] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [dateSelected, setDateSelected] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  // Consider both English and Arabic for Hotel types
  const isHotel = selectedTypeName === "Hotel";
  // Show guests when hotel or when All Types is selected (empty or explicit 'all_types')
  const shouldShowGuests = isHotel || selectedTypeName === "";
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [countriesRes, typesRes] = await Promise.all([
          axios.get(`${baseURL}/${GET_ALL_COUNTRIES}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}/${GET_ALL_ACCOMMODATION_TYPES}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCountries(countriesRes.data.countries || []);
        setTypes(typesRes.data.accommodation_types || []);
      } catch (e) {
        setCountries([]);
        setTypes([]);
      }
    };
    fetchInfo();
  }, []);

  const handleSearch = () => {
    const numericGuests = guests === "" ? null : Number(guests);
    const payload = {
      placeName: placeName || null,
      region: region || null,
      country: selectedCountry || null,
      accommodationTypeId: selectedTypeId || null,
      accommodationTypeName: selectedTypeName || null,
      guests:
        isHotel && numericGuests && numericGuests >= 1 ? numericGuests : null,
      startDate: dateRange[0]?.startDate || null,
      endDate: dateRange[0]?.endDate || null,
    };
    if (onSearch) onSearch(payload);
  };

  const Arrow = (
    <svg viewBox="0 0 360 360" xml="space" className="dropdown-arrow">
      <g id="SVGRepo_iconCarrier">
        <path
          id="XMLID_225_"
          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
        />
      </g>
    </svg>
  );

  return (
    <div className="fs" style={{ paddingTop: 0 }}>
      <div className="accommodation-filter-details-container" style={{ padding: "24px 0" }}>
        <div
          className="accommodation-filter-details-card"
          style={{ maxWidth: 980, width: "100%" }}
        >
          <h2 className="accommodation-filter-details-title" style={{ marginBottom: 10 }}>
            Book Your Stay
          </h2>
          <div
            style={{
              textAlign: "center",
              color: "var(--color3)",
              marginBottom: 24,
              direction: "ltr",
            }}
          >
            Find the perfect accommodation by selecting your destination, dates,
            and preferences.
          </div>

          <div
            className="search-bar-modern"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <div className="accommodation-filter-details-inputbox" style={{ maxWidth: 260 }}>
              <input
                required="required"
                placeholder=" "
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
              <span>Place name</span>
              <i></i>
            </div>
            <div className="accommodation-filter-details-inputbox" style={{ maxWidth: 220 }}>
              <input
                required="required"
                placeholder=" "
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <span>Region</span>
              <i></i>
            </div>

            <div
              className="owner-menu country-menu"
              style={{ margin: "0 6px" }}
            >
              <div className="owner-item">
                <a
                  href="#"
                  className="link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>{selectedCountry || "All Countries"}</span>
                  {Arrow}
                </a>
                <div className="owner-submenu" style={{ zIndex: "1000" }}>
                  <div className="owner-submenu-item">
                    <a
                      href="#"
                      className="owner-submenu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCountry("");
                      }}
                    >
                      All Countries
                    </a>
                  </div>
                  {countries.map((c) => (
                    <div className="owner-submenu-item" key={c.id}>
                      <a
                        href="#"
                        className="owner-submenu-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCountry(c.name);
                        }}
                      >
                        {c.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="owner-menu country-menu"
              style={{ margin: "0 6px" }}
            >
              <div className="owner-item">
                <a
                  href="#"
                  className="link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>{selectedTypeName || "All Types"}</span>
                  {Arrow}
                </a>
                <div className="owner-submenu">
                  <div className="owner-submenu-item">
                    <a
                      href="#"
                      className="owner-submenu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTypeName("");
                        setSelectedTypeId("");
                      }}
                    >
                      All Types
                    </a>
                  </div>
                  {types.map((t) => (
                    <div className="owner-submenu-item" key={t.id}>
                      <a
                        href="#"
                        className="owner-submenu-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTypeName(t.name);
                          setSelectedTypeId(t.id);
                        }}
                      >
                        {t.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="owner-menu country-menu"
              style={{ margin: "0 6px" }}
            >
              <div className="owner-item dd ">
                <a
                  href="#"
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDateModal(true);
                  }}
                >
                  <span style={{ direction: "ltr", textAlign: "center" }}>
                    {dateSelected &&
                    dateRange[0]?.startDate &&
                    dateRange[0]?.endDate
                      ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
                      : "Select Dates"}
                  </span>
                </a>
              </div>
            </div>

            {shouldShowGuests && (
              <div className="accommodation-filter-details-inputbox" style={{ maxWidth: 220 }}>
                <input
                  placeholder=" "
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
                <span>Guests</span>
                <i></i>
              </div>
            )}

            {/* Close search bar wrapper */}
          </div>

          {/* Date modal */}
          {showDateModal && (
            <div
              onClick={() => setShowDateModal(false)}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
                padding: 16,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "var(--color7)",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => setShowDateModal(false)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--color2)",
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                    aria-label="Close"
                    title="Close"
                  >
                    ×
                  </button>
                </div>
                <DateRange
                  months={2}
                  direction="horizontal"
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: dateRange[0]?.startDate || new Date(),
                      endDate: dateRange[0]?.endDate || new Date(),
                      key: "selection",
                    },
                  ]}
                  rangeColors="transparent"
                  onChange={({ selection }) => {
                    setDateRange([selection]);
                    if (selection?.startDate && selection?.endDate) {
                      setDateSelected(true);
                    }
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 12,
                  }}
                >
                  <SaveButton onClick={() => setShowDateModal(false)} />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 14,
            }}
          >
            <button
              className="owner-search-button users"
              onClick={handleSearch}
            >
              <svg viewBox="0 0 512 512" className="svgIcon">
                <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79 45.5-127C450.8 96.5 354.3 0 225.4 0S0 96.5 0 216.1s96.5 216.1 216.1 216.1c48 0 92.1-17.1 127-45.5l99.7 99.7c4.5 4.5 10.6 7 17 7s12.5-2.5 17-7c9.4-9.4 9.4-24.6 0-34zM216.1 392.2c-97.2 0-176.1-78.9-176.1-176.1S118.9 39.9 216.1 39.9s176.1 78.9 176.1 176.1-78.9 176.1-176.1 176.1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
