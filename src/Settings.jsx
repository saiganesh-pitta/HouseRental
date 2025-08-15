import { NavLink, useNavigate } from "react-router-dom";
import "./Settings.css";
import { States } from "./Context API/store";
import { useContext, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { CiGrid2H } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Settings = () => {
  useEffect(() => {
    Log();
  }, []);

  const navigate = useNavigate();

  const { logData, signData, setSignData, Log } = useContext(States);

  const isLoggedOut = { isLoggedOut: false };

  const handleLogOut = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      await fetch("https://backend-two-jet-82.vercel.app/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...isLoggedOut }),
      });
      navigate("/details/login");
      toast.error('Log Out Successfull', {
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
    } catch (error) {
      console.log("some error", error);
    }
  };

  const handleAccEdit = async () => {
    console.log("clicked");
    setSignData(logData.user);
    navigate("/details/signup");
  };

  const handleAccDel = async (id, e) => {
    console.log("clicked");

    let c = confirm("Do you really want to delete your Account ?");
    if (c) {
      await fetch("https://backend-two-jet-82.vercel.app/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then(navigate("/details/signup"),
             toast.error('Account Deleted Successfully', {
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
    }
  };

  return (
    <>
      <div className="settings-cont">
        <div className="settings-header">
          <NavLink to="/findhome/allhomes" id="fnt">
            <IoMdClose className="close-icon" />
          </NavLink>
          <h1>Welcome</h1>
          {logData.user && (
            <div className="username">
              <FaRegUser /> {logData.user.fullName}
            </div>
          )}
        </div>
        <NavLink to="/" id="fnt">
          <div className="settings-header">
            <IoHomeOutline /> Go to Home
          </div>
        </NavLink>

        <NavLink to="/posthome/addhome" id="fnt">
          <div className="settings-header">
            <IoMdAdd /> Add Home
          </div>
        </NavLink>

        <NavLink to="/posthome/myhome" id="fnt">
          <div className="settings-header">
            <CiGrid2H /> My Homes
          </div>
        </NavLink>
        <div className="acc-cont">
          {logData.user && (
            <button className="acc" onClick={handleAccEdit}>
              Edit Account Details
            </button>
          )}
          {logData.user && (
            <button
              className="acc-del"
              onClick={() => handleAccDel(logData.user._id)}
            >
              Delete Account
            </button>
          )}
        </div>

       { logData.user ? <div onClick={handleLogOut} className="acc-cont">
          <button className="acc-out">Log Out</button>
        </div> : <div onClick={navigate("/details/login")} className="acc-cont">
          <button className="acc-out">Log In</button>
        </div> }
      </div>

      <footer className="settings-footer">
        <p>------- developed by pitta saiganesh -------</p>
      </footer>
      <center><p className="note" >note: login with apple device there is a cookies-sessions issue </p></center>
    </>
  );
};

export default Settings;
