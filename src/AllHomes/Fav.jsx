import { useContext, useEffect, useState } from "react";
import "../Components/MyHomes.css";
import { NavLink } from "react-router-dom";
// import photo from "../compressed_image_20kb.jpg";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { States } from "../Context API/store.jsx";
import LoadingPage from "./LoadingPage.jsx";

const Fav = () => {
  const { logData, Log, FavHomesData, setFavHomesData, effect, setEffect , getFavHomes} = useContext(States);


  useEffect(() => {
    getFavHomes();
    Log();
  }, []);

  const handleRemoveFav = async (e, items) => {
    e.stopPropagation();
    e.preventDefault();
    setFavHomesData(FavHomesData.filter((item) => item._id !== items));
    await fetch("https://backend-two-jet-82.vercel.app/fav/del", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: items }),
    });
  };

  return (
    <>
           { effect && <LoadingPage/>}
           { effect && <LoadingPage/>}
           { effect && <LoadingPage/>}
      {!logData.isLoggedIn && (
        <center>
          <h3 className="log-note">
            Please <span style={{ color: "#ffD033" }}>Login</span> to add
            favtoites
          </h3>
        </center>
      )}
      {logData.isLoggedIn && FavHomesData.length === 0 ? (
        <center>
          <h1 className="log-note">No favtoites added</h1>
        </center>
      ) : (
        FavHomesData.map((items) => (
          <>
            <NavLink to={`/findhome/${items._id}`} id="anchor" key={items._id}>
              <div className="card-cont">
                <img
                  className="card-img"
                  src={`${items.photo}`}
                />
                <div className="card-details">
                  <div className="card-header">
                    <h3>{items.location}</h3>
                    <div className="rating">
                      <FaStar color="#FFD700" />
                      <span className="rating-text">3/5</span>
                    </div>
                  </div>
                  <h4>{items.area}</h4>
                  <h4>Rent: ₹{items.rent}/month</h4>
                  <p className="desc">
                    {items.BHK} {items.sqft}/sqft
                  </p>
                  <p className="uploader">uploaded by:{items.username}</p>
                  <div
                    onClick={(e) => handleRemoveFav(e, items._id)}
                    className="fav-iconAdded" >
                    <p>Remove</p> <MdFavoriteBorder />
                  </div>
                </div>
              </div>
            </NavLink>
          </>
        ))
      )}
    </>
  );
};

export default Fav;