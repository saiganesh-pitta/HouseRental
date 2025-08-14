import { NavLink } from "react-router-dom";
import "./Landing.css";
import { States } from "../Context API/store";
import { useContext, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

  const Landingpage=()=>{

       const { Log }= useContext(States);

       useEffect(() => {
              Log()
           }, [])
    
  //          const sentences = [
  //   "Welcome to Rent a House.",
  //   "Find your perfect House.",
  //   "Easy way of finding home."
  //   "Find within your Locations."
  //   "Get Directions of Houses."
  // ];

  // const [text, setText] = useState("");
  // const [sentenceIndex, setSentenceIndex] = useState(0);
  // const [charIndex, setCharIndex] = useState(0);
  // const [isDeleting, setIsDeleting] = useState(false);

  // useEffect(() => {
  //   const currentSentence = sentences[sentenceIndex];
  //   let typingSpeed = isDeleting ? 50 : 100; // speed while deleting or typing

  //   const timer = setTimeout(() => {
  //     if (!isDeleting) {
  //       // Typing
  //       setText(currentSentence.substring(0, charIndex + 1));
  //       setCharIndex(prev => prev + 1);

  //       if (charIndex === currentSentence.length) {
  //         // Pause before deleting
  //         setTimeout(() => setIsDeleting(true), 1000);
  //       }
  //     } else {
  //       // Deleting
  //       setText(currentSentence.substring(0, charIndex - 1));
  //       setCharIndex(prev => prev - 1);

  //       if (charIndex === 0) {
  //         setIsDeleting(false);
  //         setSentenceIndex((prev) => (prev + 1) % sentences.length);
  //       }
  //     }
  //   }, typingSpeed);

  //   return () => clearTimeout(timer);
  // }, [charIndex, isDeleting, sentenceIndex]);


    return (<>
    <div className="landing-cont" >
        <div className="typing-cont" >
           <h2 className="typing">
              welcome to rent house <span style={{ borderRight: "2px solid black" }}></span>
           </h2>
        </div>
        <div className="page-cont" >     
             <NavLink to="/findhome/allhomes" className="main-btns"><IoSearchSharp /> Find House</NavLink>
             <NavLink to="/posthome/myhome" className="main-btns"><IoMdAdd /> Post House</NavLink>
        </div>
      </div>
    </>)
  }

  export default Landingpage;