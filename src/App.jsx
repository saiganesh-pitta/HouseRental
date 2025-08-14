import "./App.css"
import Navbar from "./Components/Nav.jsx";
import { Route, Routes } from "react-router-dom";
import StatesProvider from "./Context API/store.jsx";
import Landingpage from "./Landingpage/Landingpage.jsx";
import FindHome from "./Landingpage/FindHome.jsx";
import PostHome from "./Landingpage/PostHome.jsx";
import Settings from "./Settings.jsx";
import LoginCont from "./loginpage/loginCont.jsx";
import { States } from "./Context API/store.jsx";
import { useContext, useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
  
        
   function App() {

         const { Log }= useContext(States);

      useEffect(() => {
                   Log()
                }, [])
    return(<>
    <StatesProvider>
    <Navbar/>
         <ToastContainer/>
       <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/findhome/*" element={<FindHome/>} />
          <Route path="/posthome/*" element={<PostHome/>} />
          <Route path="/settings/*" element={<Settings/>} />
          <Route path="/details/*" element={ <LoginCont/> }  />         
       </Routes>
    </StatesProvider>
    </>)
 }

 export default App;
