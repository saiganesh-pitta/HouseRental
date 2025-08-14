import { useContext, useEffect, useState } from "react";
// import photo from "../compressed_image_20kb.jpg"
import "./MyHomes.css";
import { FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { States } from "../Context API/store.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingPage from "../AllHomes/LoadingPage.jsx";
import { Bounce, ToastContainer, toast } from 'react-toastify';
// import { useParams } from "react-router-dom";

const MyHomes = () => {
  // const { id } = useParams();

  const navigate = useNavigate();
  const { setForm, Log ,effect, setEffect} = useContext(States);

  const [HomesData, setHomesData] = useState([]);

  const getHomes = async () => {
    try {
      setEffect(true)
      const response = await fetch(
        "https://backend-two-jet-82.vercel.app/myhomes",
        { credentials: "include" }
      );
      const data = await response.json();
      setHomesData(data.reverse());
      setEffect(false)
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };

  useEffect(() => {
    getHomes();
    Log();
  }, []);

  const handleEdit = async (items, e) => {
    e.stopPropagation();
    e.preventDefault();
    setForm({ ...HomesData.filter((items) => items._id === items._id)[0] });
    setHomesData(HomesData.filter((item) => item._id !== items._id));
    navigate("/posthome/addhome");
    //  await fetch(`https://backend-two-jet-82.vercel.app/update`, {method: "POST",headers:{"Content-Type": "application/json" }, body: JSON.stringify({...items}) })
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    let c = confirm("Do you really want to delete this House?");
    if (c) {
      console.log("clicked", id);
      setHomesData(HomesData.filter((item) => item._id !== id));
      await fetch("https://backend-two-jet-82.vercel.app/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      });
      toast("Deleted Successfully ", {
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
    }
  };

  return (
    <>
           { effect && <LoadingPage/>}
           { effect && <LoadingPage/>}
           { effect && <LoadingPage/>}
         <ToastContainer/>
      {HomesData.length === 0 ? (
        <center>
          <h1 className="log-note">No Added Homes</h1>
        </center>
      ) : (
        HomesData.map((items) => (
          <>
            <NavLink to={`/posthome/${items._id}`} key={items._id} id="anchor">
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
                  <div className="edit-icons">
                    <CiEdit onClick={(e) => handleEdit(items, e)} />
                    <MdDeleteOutline
                      onClick={(e) => handleDelete(items._id, e)}
                    />
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

export default MyHomes;
