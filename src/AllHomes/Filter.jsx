import  { useContext, useState } from "react";
import "./Filter.css"
import { States } from "../Context API/store.jsx";

 const FilterBar = () => {

  const { filters, setFilters} = useContext(States);
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  return (
    <div className="filter-bar" >
      <select name="location" className="filter-options" value={filters.area} onChange={handleChange}>
        <option value="">Select Area</option>
           <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
      </select>

      <select name="BHK" className="filter-options" value={filters.bhk} onChange={handleChange}>
        <option value="">Select BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
        <option value="4">4 BHK</option>
      </select>
    </div>
  );
}

export default FilterBar;
