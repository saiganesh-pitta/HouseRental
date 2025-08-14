import { Route, Routes } from "react-router-dom";
import FindHomeBtns from "./FindHomeBtns.jsx";
import AllHomes from "../AllHomes/AllHomes.jsx";
import Fav from "../AllHomes/Fav.jsx";
import HomeDetails from "../Components/HomeDetailPage.jsx";
import FilterBar from "../AllHomes/Filter.jsx";

const FindHome=()=>{

    return (<>
     <FindHomeBtns/>
      <FilterBar/>
     <Routes>
        <Route path="/allhomes" element={ <AllHomes  id="scroll" /> } />
        <Route path="/fav" element={ <Fav/> } />
       <Route path='/:id'  element={ <HomeDetails/> } />
        
     </Routes>
    </>)
}

 export default FindHome;
