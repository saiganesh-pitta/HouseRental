import React from "react";
import "./AddHome.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { States } from "../Context API/store.jsx";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const AddHome = () => {
  const { form, setForm, file, setFile, logData } = useContext(States);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const data = new FormData();
  data.append("location", form.location);
  data.append("area", form.area);
  data.append("rent", form.rent);
  data.append("BHK", form.BHK);
  data.append("sqft", form.sqft);
  data.append("more_details", form.more_details);
  data.append("photo", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (logData.isLoggedIn) {
      await fetch("https://backend-two-jet-82.vercel.app/", {
        method: "POST",
        credentials: "include",
        body: data,
      }).then(navigate("/posthome/myhome"), setForm(""),
            toast.success('Added House Successfully', {
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

  return (
    <>
         <ToastContainer/>
      <div className="card-wrapper">
        <form className="input-form" onSubmit={handleSubmit}>
          {/* <input className="input" onChange={handleChange} type="text" value={form.username} name="username" placeholder="username" required/> */}
          <input
            className="input"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileChange}
            type="file"
            name="photo"
            required
          />
          <select
            className="input"
            value={form.location}
            name="location"
            onChange={handleChange}
            required
          >
            <option value="">Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
          </select>
          <input
            className="input"
            value={form.area}
            name="area"
            onChange={handleChange}
            type="text"
            placeholder="area"
            required
          />
          <select
            className="input"
            value={form.BHK}
            name="BHK"
            onChange={handleChange}
            required
          >
            <option value="">BHK</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
          </select>
          <input
            className="input"
            value={form.sqft}
            name="sqft"
            onChange={handleChange}
            type="number"
            placeholder="sqft"
            required
          />
          <textarea
            className="input"
            value={form.more_details}
            name="more_details"
            onChange={handleChange}
            type="text"
            placeholder="more_details"
          />
          <input
            className="input"
            onChange={handleChange}
            type="number"
            value={form.rent}
            name="rent"
            placeholder="rent/Monthly"
            required
          />
          <button type="submit" className="submit-btn">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default AddHome;
