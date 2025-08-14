import { NavLink, useNavigate } from "react-router-dom";
import "../loginpage/loginCont.css";
import { useState } from "react";
import { States } from "../Context API/store";
import { useContext } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const { signData, setSignData } = useContext(States);

  const [error, setError] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setSignData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://backend-two-jet-82.vercel.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...signData }),
      }).then(async (response) => {
        toast.success('Sign In Successful', {
                                     position: "top-right",
                                     autoClose: 5000,
                                     hideProgressBar: false,
                                     closeOnClick: false,
                                     pauseOnHover: true,
                                     draggable: true,
                                     progress: undefined,
                                     theme: "dark",
                                     transition: Bounce,
                                     });
        const data = await response.json();
        if (data.errors) {
          setError(data.errors);
        } else {
          navigate("/details/login");
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
     <ToastContainer/>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="signtop">
            {error && <p className="errmssg">{error.fullName}</p>}
            <input
              onChange={handleChange}
              className="loguser"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={signData.fullName}
              required
            />
          </div>
          <div>
            {error && <p className="errmssg">{error.username}</p>}
            <input
              onChange={handleChange}
              className="logpass"
              type="text"
              name="username"
              placeholder="username/e-mail"
              value={signData.username}
              required
            />
          </div>
          <div>
            {error && <p className="errmssg">{error.password}</p>}
            <input
              onChange={handleChange}
              className="logpass"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            {error && <p className="errmssg">{error.confirmPassword}</p>}
            <input
              onChange={handleChange}
              className="logpass"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              required
            />
          </div>
          <div className="checkbox">
            <input
              onChange={handleChange}
              className="logcheckbox"
              type="checkbox"
              name="terms"
              placeholder="Re-enter Password"
              id="terms"
              required
            />
            <label id="terms">I agree to the terms & conditions</label>
          </div>
          <div>
            <button className="logbtn" type="submit">
              Sign up
            </button>
          </div>
          <div className="accmssg-cont">
            <p className="accmssg">
              already have account ?{" "}
              <NavLink to="/details/login" className="acclink">
                Login
              </NavLink>{" "}
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
