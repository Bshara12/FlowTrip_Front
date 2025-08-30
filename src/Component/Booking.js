import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PaymentCard from './PaymentCard';
import SaveButton from './SaveButton';
import PaymentButton from './PaymentButton';

const Booking = ({ type, accommodation, onClose, onPayment }) => {
  const [formData, setFormData] = useState({
    nationalId: '',
    travelerName: '',
  });
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: ''
  });
  
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [currentDateType, setCurrentDateType] = useState('');
  const [tempDate, setTempDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderRoomFields = () => (
    <>
      <div className="booking-section">
        <h3>Booking Details</h3>
        <div className="booking-form-row">
          <div className="booking-form-group">
            <label>📅 Check-in Date</label>
            <div 
              className="booking-date-selector"
              onClick={() => {
                setCurrentDateType('checkIn');
                setTempDate(checkInDate || new Date());
                setShowDateModal(true);
              }}
            >
              <span>
                {checkInDate
                  ? checkInDate.toLocaleDateString()
                  : 'Select Check-in Date'
                }
              </span>
              <svg viewBox="0 0 24 24" className="booking-calendar-icon">
                <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>
          <div className="booking-form-group">
            <label>📅 Check-out Date</label>
            <div 
              className="booking-date-selector"
              onClick={() => {
                setCurrentDateType('checkOut');
                setTempDate(checkOutDate || new Date());
                setShowDateModal(true);
              }}
            >
              <span>
                {checkOutDate
                  ? checkOutDate.toLocaleDateString()
                  : 'Select Check-out Date'
                }
              </span>
              <svg viewBox="0 0 24 24" className="booking-calendar-icon">
                <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="booking-form-row">
          <div className="booking-form-group">
            <label htmlFor="nationalId">National ID</label>
            <input
              type="number"
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              placeholder="Enter National ID"
              required
            />
          </div>
          <div className="booking-form-group">
            <label htmlFor="travelerName">Traveler Name</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={formData.travelerName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderAccommodationFields = () => (
    <>
      <div className="booking-section">
        <h3>Booking Details</h3>
        <div className="booking-form-row">
          <div className="booking-form-group">
            <label>📅 Check-in Date</label>
            <div 
              className="booking-date-selector"
              onClick={() => {
                setCurrentDateType('checkIn');
                setTempDate(checkInDate || new Date());
                setShowDateModal(true);
              }}
            >
              <span>
                {checkInDate
                  ? checkInDate.toLocaleDateString()
                  : 'Select Check-in Date'
                }
              </span>
              <svg viewBox="0 0 24 24" className="booking-calendar-icon">
                <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>
          <div className="booking-form-group">
            <label>📅 Check-out Date</label>
            <div 
              className="booking-date-selector"
              onClick={() => {
                setCurrentDateType('checkOut');
                setTempDate(checkOutDate || new Date());
                setShowDateModal(true);
              }}
            >
              <span>
                {checkOutDate
                  ? checkOutDate.toLocaleDateString()
                  : 'Select Check-out Date'
                }
              </span>
              <svg viewBox="0 0 24 24" className="booking-calendar-icon">
                <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="booking-form-row">
          <div className="booking-form-group">
            <label htmlFor="nationalId">National ID</label>
            <input
              type="number"
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              placeholder="Enter National ID"
              required
            />
          </div>
          <div className="booking-form-group">
            <label htmlFor="travelerName">Traveler Name</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={formData.travelerName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <StyledWrapper style={{width:'75%', display:'flex', justifyContent:'center'}}>
      <div className="booking-container" onClick={(e) => e.stopPropagation()}>
        <div className="booking-header">
          <h2>Booking {type === 'room' ? 'Room' : 'Accommodation'}</h2>
          <button className="booking-close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={(e)=> {e.preventDefault()}} className="booking-form">
          <div className="booking-accommodation-info">
            <h3>{accommodation?.hotel_name || accommodation?.accommodation_name}</h3>
            <p className="booking-location">📍 {accommodation?.location}</p>
            <p className="booking-price">
              💰 {accommodation?.offer_price && accommodation.offer_price !== "0" ? (
                <>
                  <span className="booking-original-price">{accommodation.price}$</span>
                  <span className="booking-offer-price"> {accommodation.offer_price}$</span>
                </>
              ) : (
                <span>{accommodation?.price}$</span>
              )}
              {type === 'room' ? ' / Night' : ' / Day'}
            </p>
          </div>

          {type === 'room' ? renderRoomFields() : renderAccommodationFields()}

          <div className="booking-section">
            <h3>Payment Information</h3>
            <PaymentCard cardData={cardData} setCardData={setCardData} />
          </div>
          
          {showDateModal && (
            <div
              className="booking-date-modal-overlay"
              onClick={() => setShowDateModal(false)}
            >
              <div
                className="booking-date-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="booking-date-modal-header">
                  <h3>
                    {currentDateType === 'checkIn' ? 'Select Check-in Date' : 'Select Check-out Date'}
                  </h3>
                  <button
                    className="booking-close-button"
                    onClick={() => setShowDateModal(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <Calendar
                  date={tempDate}
                  onChange={(date) => setTempDate(date)}
                  minDate={currentDateType === 'checkOut' && checkInDate ? checkInDate : new Date()}
                />
                <div className="booking-date-modal-footer">
                  <SaveButton
                    onClick={() => {
                      if (currentDateType === 'checkIn') {
                        setCheckInDate(tempDate);
                      } else {
                        setCheckOutDate(tempDate);
                      }
                      setShowDateModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <PaymentButton 
            onPayment={onPayment} 
            formData={formData}
            cardData={cardData}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            accommodation={accommodation}
          />
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .booking-form {
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
    background: white;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .booking-form::-webkit-scrollbar {
    display: none;
  }
  
  .booking-form {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .booking-header {
    background: linear-gradient(135deg, var(--color1, #007bff), var(--color3, #28a745));
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px 12px 0 0;
  }

  .booking-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .booking-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 24px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .booking-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  .booking-form {
    padding: 25px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .booking-accommodation-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 25px;
    border-left: 4px solid var(--color1, #007bff);
  }

  .booking-accommodation-info h3 {
    margin: 0 0 10px 0;
    color: var(--color2, #333);
    font-size: 1.3rem;
  }

  .booking-location, .booking-price {
    margin: 5px 0;
    color: var(--color2, #666);
    font-size: 1rem;
  }

  .booking-original-price {
    text-decoration: line-through;
    color: #999;
    margin-left: 10px;
  }

  .booking-offer-price {
    color: var(--color4, #dc3545);
    font-weight: 700;
    font-size: 1.1em;
  }

  .booking-section {
    margin-bottom: 25px;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    background: #fafafa;
  }

  .booking-section h3 {
    margin: 0 0 20px 0;
    color: var(--color2, #333);
    font-size: 1.2rem;
    border-bottom: 2px solid var(--color1, #007bff);
    padding-bottom: 8px;
  }

  .booking-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .booking-form-group {
    display: flex;
    flex-direction: column;
  }

  .booking-form-group label {
    margin-bottom: 8px;
    color: var(--color2, #555);
    font-weight: 600;
    font-size: 0.95rem;
  }

  .booking-form-group input,
  .booking-form-group select,
  .booking-form-group textarea {
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
  }

  .booking-form-group input:focus,
  .booking-form-group select:focus,
  .booking-form-group textarea:focus {
    outline: none;
    border-color: var(--color1, #007bff);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .booking-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 10px;
  }

  .booking-service-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .booking-service-checkbox:hover {
    background: #f0f8ff;
    border-color: var(--color1, #007bff);
  }

  .booking-service-checkbox input[type="checkbox"] {
    margin: 0;
    width: auto;
    height: auto;
  }

  .booking-payment-section {
    margin-bottom: 25px;
    padding: 20px;
    border: 2px dashed var(--color3, #28a745);
    border-radius: 12px;
    background: #f8fff9;
  }

  .booking-payment-section h3 {
    margin: 0 0 20px 0;
    color: var(--color3, #28a745);
    font-size: 1.2rem;
    text-align: center;
  }

  .booking-submit-section {
    text-align: center;
    padding-top: 20px;
    border-top: 2px solid #e9ecef;
  }

  .booking-submit-btn {
    background: linear-gradient(135deg, var(--color1, #007bff), var(--color3, #28a745));
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .booking-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 123, 255, 0.4);
  }

  .booking-submit-btn:active {
    transform: translateY(0);
  }

  /* Date Selector Styles */
  .booking-date-selector {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
  }
  
  .booking-date-selector:hover {
    border-color: #4a90e2;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
  }
  
  .booking-date-selector span {
    color: #333;
    flex: 1;
  }
  
  .booking-date-selector .booking-calendar-icon {
    width: 20px;
    height: 20px;
    color: #4a90e2;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .booking-date-selector:hover .booking-calendar-icon {
    opacity: 1;
  }

  /* Date Modal Styles */
  .booking-date-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 16px;
  }
  
  .booking-date-modal-content {
    background: white;
    border-radius: 16px;
    padding: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;
  }
  
  .booking-date-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e1e5e9;
  }
  
  .booking-date-modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }
  
  .booking-date-modal-header .booking-close-button {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .booking-date-modal-header .booking-close-button:hover {
    background: #f5f5f5;
    color: #333;
  }
  
  .booking-date-modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #e1e5e9;
    display: flex;
    justify-content: flex-end;
  }

  /* Enhanced label styling for date fields */
  .booking-form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: var(--color2, #555);
    font-weight: 600;
    font-size: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .booking-container {
      max-width: 95%;
      margin: 10px;
    }

    .booking-form {
      padding: 15px;
      max-height: 75vh;
    }

    .booking-form-row {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .booking-services-grid {
      grid-template-columns: 1fr;
    }

    .booking-header h2 {
      font-size: 1.3rem;
    }

    .booking-submit-btn {
      padding: 12px 30px;
      font-size: 1rem;
    }

    .booking-date-selector {
      padding: 10px 14px;
      font-size: 0.95rem;
    }

    .booking-date-modal-content {
      margin: 0;
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
    }
    
    .booking-date-modal-overlay {
      padding: 0;
    }
  }

  @media (max-width: 480px) {
    .booking-accommodation-info,
    .booking-section,
    .booking-payment-section {
      padding: 15px;
    }

    .booking-header {
      padding: 15px;
    }

    .booking-header h2 {
      font-size: 1.2rem;
    }

    .booking-date-selector {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
  }
`;

export default Booking;