import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HomeDetailPage.css";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaComments,
  FaMapMarkedAlt,
  FaTimes,
} from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaCity,
  FaRupeeSign,
  FaHome,
  FaRulerCombined,
  FaUser,
  FaCalendarAlt,
  FaInfoCircle,
  FaFileContract,
} from "react-icons/fa";
import { States } from "../Context API/store";

const HomeDetails = () => {
  const { Log } = useContext(States);

  const [showCallModal, setShowCallModal] = useState(false);

  const phoneNumber = "9573945391";

  const [showFullRules, setShowFullRules] = useState(false);

  const rulesText = `
  No bachelors allowed, only family tenants.
  Additional water bill will be charged monthly.
  Electricity bill as per meter reading.
  Advance payment of 2 months' rent is mandatory before moving in.
  `;
  const navigate = useNavigate();

  const { id } = useParams();
  const [home, setHome] = useState([]);

  const detailHome = async () => {
    try {
      const response = await fetch(
        `https://backend-two-jet-82.vercel.app/home/${id}`);
      const data = await response.json();
      setHome(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };

  useEffect(() => {
    detailHome();
    Log();
  }, []);

  return (
    <>
      <div className="details-container">
        <div className="details-header">
          <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
          <h2>House Details</h2>
        </div>

        <img
          src={`${home.photo}`}
          alt="House"
          className="details-photo"
        />
        <div className="details-info">
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <strong>Location:</strong> <span>{home.location}</span>
          </div>

          <div className="detail-item">
            <FaCity className="detail-icon" />
            <strong>Area:</strong> <span>{home.area}</span>
          </div>

          <div className="detail-item">
            <FaRupeeSign className="detail-icon" />
            <strong>Rent:</strong> <span>{home.rent}</span>
          </div>

          <div className="detail-item">
            <FaHome className="detail-icon" />
            <strong>BHK:</strong> <span>{home.BHK}</span>
          </div>

          <div className="detail-item">
            <FaRulerCombined className="detail-icon" />
            <strong>Square Feet:</strong> <span>{home.sqft} sqft</span>
          </div>

          <div className="detail-item">
            <FaUser className="detail-icon" />
            <strong>Posted By:</strong> <span>{home.postedBy}</span>
          </div>

          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <strong>Posted On:</strong>
            <span>{home.createdAt}</span>
          </div>

          <div className="detail-item">
            <FaInfoCircle className="detail-icon" />
            <strong>More Details:</strong> <span>{home.more_details}</span>
          </div>
        </div>
        <div className="map-section">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent( `${home.location}${home.area}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            <FaMapMarkedAlt className="map-icon" /> Get Directions
          </a>
        </div>

        <div className="rules-section">
          <div className="rules-header">
            <FaFileContract className="detail-icon" />
            <h3>Rules & Regulations</h3>
          </div>
          <p className="rules-text">
            {showFullRules ? rulesText : `${rulesText.substring(0, 70)}...`}
          </p>
          <button
            className="read-more-btn"
            onClick={() => setShowFullRules(!showFullRules)}
          >
            {showFullRules ? "Read Less" : "Read More"}
          </button>
        </div>

        <div className="action-buttons">
          <button className="pay-btn">💳 Pay Advance for Booking</button>

          <button className="call-btn" onClick={() => setShowCallModal(true)}>
            <FaPhoneAlt /> Call
          </button>

          <a
            href={`https://wa.me/${phoneNumber}?text=Hi%20there...`}
            target="_blank"
          >
            <button className="chat-btn">
              <FaComments /> Chat
            </button>
          </a>
        </div>
      </div>

      {showCallModal && (
        <div className="modal-overlay">
          <div className="call-modal">
            <FaTimes
              className="close-icon"
              onClick={() => setShowCallModal(false)}
            />
            <h3>Contact Owner</h3>
            <p className="phone-number">{phoneNumber}</p>
            <a href={`tel:${phoneNumber}`} className="call-now-btn">
              <FaPhoneAlt /> Call Now
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeDetails;
