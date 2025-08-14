import { NavLink, Route, Routes } from "react-router-dom";
import "../loginpage/loginCont.css"
import Login from "./login.jsx";
import SignUp from "./Signup.jsx";
import { MdClose } from "react-icons/md";

const LoginCont=()=>{



    return(<>
      <div className="login-cont" >
        <div className="login-box" > 
          <NavLink to="/" ><MdClose id="cross"/></NavLink>
         <div className="loglinks" >
           <NavLink to="/details/login" id="fnt" className={(e)=> e.isActive ? "linkact":""}  ><h2>Login</h2></NavLink>
           <NavLink to="/details/signup" id="fnt" className={(e)=> e.isActive ? "linkact":""}  ><h2>SignUp</h2></NavLink>
         </div>
         <Routes> 
           <Route path="/login" element={<Login/>} />     
           <Route path="/signup" element={<SignUp/>} />     
         </Routes> 
        </div> 
      </div> 
    </>)
}

export default LoginCont;