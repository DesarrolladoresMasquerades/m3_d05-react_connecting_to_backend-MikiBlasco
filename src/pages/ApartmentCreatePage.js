import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApartmentCreatePage() {

    const [formData, setFormData] = useState({});
    const params = useParams(); // same as req.params.apartmentId
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault()
        axios.post(`https://ironbnb-m3.herokuapp.com/apartments/`, formData)
        .then((newData) => navigate(`/apartments/`))
        .catch((error) => navigate(`/apartments/`));
    }
  
    function handleChange(event){
        const inputName = event.target.name;
        const value = event.target.value;
        setFormData((formData)=> {
            return { ...formData, [inputName]: value}
        })
    }
  
    return (
      <div className="AddApartmentPage">
        <h3>Create apartment</h3>
  
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" onChange={handleChange} value={formData.title} />
  
          <label>Price per Day</label>
          <input type="number" name="pricePerDay" onChange={handleChange} value={formData.pricePerDay} />          <button type="submit">Create</button>
        </form>
      </div>
    );

}

export default ApartmentCreatePage;