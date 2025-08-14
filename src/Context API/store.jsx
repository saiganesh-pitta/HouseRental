import { createContext, useState } from "react";

export const States = createContext({
  form: [],
  setForm: [],
  Log:() => {},
  logData: [],
  setLogData: [],
  file: [],
  setFile: [],
  signData: [],
  setSignData: [],
  FavHomesData: [],
  setFavHomesData: [],
  effect:[],
  setEffect:[],
  getFavHomes:()=>[],
  filters:[],
 setFilters:[],
});

const StatesProvider = ({ children }) => {
  const [effect,setEffect]= useState(false);

  const [file, setFile] = useState();

  const [form, setForm] = useState({
    //  id:Math.random(),
    photo: "",
    location: "",
    area: "",
    rent: "",
    BHK: "",
    sqft: "",
    more_details: "",
  });

  const [signData, setSignData] = useState([]);
  const [FavHomesData, setFavHomesData] = useState([]);

  const [logData, setLogData] = useState([]);
  const [filters, setFilters] = useState({location:"",BHK:""});

  const Log = async () => {
    try {
      const response = await fetch(
        "https://backend-two-jet-82.vercel.app/auth",
        { credentials: "include" }
      );
      const data = await response.json();
      setLogData(data);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };

    const  getFavHomes = async () => {
      try {
        setEffect(true)
        const response = await fetch(
          "https://backend-two-jet-82.vercel.app/fav",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setFavHomesData(data);
        setEffect(false)
      } catch (error) {
        console.log("Failed to fetch home data:", error);
      }
    };

  return (
    <States.Provider
      value={{
        form,
        setForm,
        Log,
        logData,
        setLogData,
        file,
        setFile,
        signData,
        setSignData,
        FavHomesData,
        setFavHomesData,
        effect,
        setEffect,
        getFavHomes,
        filters,
        setFilters,
      }}
    >
      {children}
    </States.Provider>
  );
};

export default StatesProvider;
