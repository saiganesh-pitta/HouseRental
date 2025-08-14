import { NavLink } from "react-router-dom";
import "../Components/Button.css"

 const Buttons=()=>{

    return(<>
    <div className="btn-cont" >
     <NavLink  to="/posthome/myhome" className={({ isActive }) => isActive ? "button-click" : "button"}>My Homes</NavLink>
     <NavLink to="/posthome/addhome" className={({ isActive }) => isActive ? "button-click" : "button"}>Add Home</NavLink>
    </div>

    </>)
 }

 export default Buttons;