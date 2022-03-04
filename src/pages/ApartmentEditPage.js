import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ApartmentEditPage() {
  const [formData, setFormData] = useState({
      headline: "Loading data...",
      pricePerDay: "0",   
    });
  const params = useParams(); // same as req.params.apartmentId
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://ironbnb-m3.herokuapp.com/apartments/${params.apartmentId}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.log(error));
  });

  function handleSubmit(event) {
      event.preventDefault()
      axios.post(`https://ironbnb-m3.herokuapp.com/apartments/${params.apartmentId}`, formData)
      .then((newData) => navigate(`/apartments/${params.apartmentId}`))
      .catch((error) => navigate(`/apartments/${params.apartmentId}/edit`));
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
      <h3>Edit apartment {"apartment.title"}</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" onChange={handleChange} value={formData.title} />

        <label>Price per Day</label>
        <input type="number" name="pricePerDay" onChange={handleChange} value={0} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
