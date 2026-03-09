import axios from "axios";
import { useEffect, useState } from "react";

function Properties(){

 const [properties,setProperties] = useState([]);

 useEffect(()=>{

  fetchProperties();

 },[]);

 const fetchProperties = async ()=>{

  const res = await axios.get(
   "http://localhost:5000/api/properties"
  );

  setProperties(res.data);

 };

 return(

  <div className="container mt-5">

   <h2 className="mb-4">Available Properties</h2>

   <div className="row">

    {properties.map(property =>(

     <div className="col-md-4" key={property.id}>

      <div className="card shadow p-3 mb-3">

       <h5>{property.title}</h5>

       <p>Location: {property.location}</p>

       <p>Rent: ₹{property.rent}</p>

       <p>Available From: {property.available_from}</p>

      </div>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Properties;