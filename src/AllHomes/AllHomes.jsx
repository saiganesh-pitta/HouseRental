import { useContext, useEffect, useState } from "react";
import "../Components/MyHomes.css";
import { FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { States } from "../Context API/store.jsx";
import LoadingPage from "./LoadingPage.jsx";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const AllHomes = () => {
  const navigate = useNavigate();
  const [allHomesData, setallHomesData] = useState([]);
  const { logData, Log , effect, setEffect, getFavHomes,filters, setFilters} = useContext(States);
  const [filteredHomes, setFilteredHomes] = useState([]);

  const getHomes = async () => {
    try {
      setEffect(true)
      const response = await fetch(
        "https://backend-two-jet-82.vercel.app/",
        { credentials: "include" }
      );
      const data = await response.json();
      setallHomesData(data.reverse());
      setEffect(false)
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };
  useEffect(() => {
    getHomes();
    Log();
  }, []);


     useEffect(() => {
    let filtered = allHomesData;

    if (filters.area) {
      filtered = filtered.filter(
        (home) => home.location.toLowerCase() === filters.location.toLowerCase()
      );
    }
    if (filters.bhk) {
      filtered = filtered.filter((home) => home.BHK === Number(filters.BHK));
    }
    setFilteredHomes(filtered);
  }, [filters, allHomesData]);



  const handleAddFav = async (e, items) => {
    e.stopPropagation();
    e.preventDefault();
    if (logData.isLoggedIn) {
      await fetch(
        "https://backend-two-jet-82.vercel.app/fav",
        { method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: items }),
        }
      ).then( 
              getFavHomes(),
        toast("❤️ Added to fav's ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                })
      );
    } else {
      navigate("/details/login");
    }
  };

  return (<>
            <ToastContainer/>
        {effect && <LoadingPage/> }
        {effect && <LoadingPage/> }
        {effect && <LoadingPage/> }
       {allHomesData.length === 0 ? (
        <center>
          <h1>NO Homes</h1>
        </center>
      ) : (
        (filteredHomes.length >= 1 ? filteredHomes : allHomesData).map((items) => (
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
                  <p className="uploader">uploaded by:{items.postedBy}</p>
                  <div
                    onClick={(e) => handleAddFav(e, items._id)}
                    className="fav-icon">
                    <p>Add</p> <MdFavoriteBorder />
                  </div>
                </div>
              </div>
            </NavLink>
          </>
        ))
      )}
    </>
  )
};

export default AllHomes;
