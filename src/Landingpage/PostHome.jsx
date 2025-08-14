import { Route, Routes } from "react-router-dom";
import MyHomes from "../Components/MyHomes.jsx";
import AddHome from "../Components/AddHome.jsx";
import Buttons from "../Components/Button.jsx";
import HomeDetails from "../Components/HomeDetailPage.jsx";



const PostHome=()=>{

    return (<>
      <Buttons/>
               <Routes >
                   <Route path='/myhome'  element={<MyHomes/>} />
                   <Route path='/addhome'  element={ < AddHome/> } />
                   <Route path='/:id'  element={ <HomeDetails/> } />
               </Routes>
    </>)
}

export default PostHome;
