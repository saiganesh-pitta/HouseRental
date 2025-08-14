import { IoGridOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./FindHomeBtns.css"
import { useContext } from "react";
import { States } from "../Context API/store.jsx";

 const FindHomeBtns=()=>{

  const {  FavHomesData }= useContext(States)


    return(<>
    <div className="findhomes-cont" >
       <NavLink to="/findhome/allhomes" className={({ isActive }) =>`allposts ${isActive &&'on'}`}>
        <i>  <IoGridOutline/>  </i>
       </NavLink>
       <NavLink to="/findhome/fav"  className={({ isActive }) =>`favorites ${isActive &&'on'}`}>
           <i><MdFavoriteBorder /></i> {FavHomesData.length >0 && <p style={{fontSize:"15px"}} >({FavHomesData.length})</p>}
             
        </NavLink>
    </div>
     </>)
 }

 export default FindHomeBtns