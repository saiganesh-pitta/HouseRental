import { NavLink, useNavigate } from "react-router-dom";
import "../loginpage/loginCont.css";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { States } from "../Context API/store.jsx";
import { useContext, useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { Log } = useContext(States);

  useEffect(() => {
    Log();
  }, []);

  const navigate = useNavigate();
  const [logDetails, setLogDetails] = useState([]);
  const [logError, setLogError] = useState([]);

  const handleChange = (e) => {
    setLogDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://backend-two-jet-82.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...logDetails }),
      }).then( toast.success('Successfully Logged In', {
                             position: "top-right",
                             autoClose: 5000,
                             hideProgressBar: false,
                             closeOnClick: false,
                             pauseOnHover: true,
                             draggable: true,
                             progress: undefined,
                             theme: "dark",
                             transition: Bounce,
                             }), 
        async (response) => {
        const data = await response.json();
        if (data.errors) {
          setLogError(data.errors);
          console.log(data.errors);
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={handleChange}
              className="loguser"
              type="text"
              name="username"
              placeholder="username"
              required
              style={{ marginTop: "10px" }}
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              className="logpass"
              type="password"
              name="password"
              placeholder="password"
              required
            />
            {logError && <p className="loginerrmssg">{logError}</p>}
          </div>
          <div>
            <button type="submit" className="logbtn">
              <CiLogin /> Login
            </button>
          </div>
          <div className="accmssg-cont">
            <p className="accmssg">
              Don't have account ?
              <NavLink to="/details/signup" className="acclink">
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
