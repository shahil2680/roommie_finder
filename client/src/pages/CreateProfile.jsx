import axios from "axios";
import { useState } from "react";

function CreateProfile(){

 const [form,setForm] = useState({});

 const handleChange = (e) => {

  setForm({
   ...form,
   [e.target.name]:e.target.value
  });

 };

 const submit = async () => {

  const mobile = localStorage.getItem("mobile");

  const data = {
   ...form,
   mobile
  };

  await axios.post(
   "http://localhost:5000/api/user/create-profile",
   data
  );

  alert("Profile Created");

 };

 return(

  <div className="container mt-5">

   <h2 className="mb-4">Create Profile</h2>

   <div className="row">

    <div className="col-md-6">

     <input name="name" className="form-control mb-3" placeholder="Name" onChange={handleChange}/>
     <input name="age" className="form-control mb-3" placeholder="Age" onChange={handleChange}/>
     <input name="gender" className="form-control mb-3" placeholder="Gender" onChange={handleChange}/>
     <input name="occupation" className="form-control mb-3" placeholder="Occupation" onChange={handleChange}/>
     <input name="college_company" className="form-control mb-3" placeholder="College / Company" onChange={handleChange}/>
     <input name="mother_tongue" className="form-control mb-3" placeholder="Mother Tongue" onChange={handleChange}/>
     <input name="region" className="form-control mb-3" placeholder="Region" onChange={handleChange}/>
     <input name="budget" className="form-control mb-3" placeholder="Budget" onChange={handleChange}/>
     <input name="preferred_location" className="form-control mb-3" placeholder="Preferred Location" onChange={handleChange}/>
     <input name="stay_duration" className="form-control mb-3" placeholder="Stay Duration" onChange={handleChange}/>

     <button
      className="btn btn-success"
      onClick={submit}
     >
      Save Profile
     </button>

    </div>

   </div>

  </div>

 );

}

export default CreateProfile;