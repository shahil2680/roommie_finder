import axios from "axios";
import { useState } from "react";

function Matches(){

 const [form,setForm] = useState({});
 const [users,setUsers] = useState([]);

 const handleChange = (e)=>{

  setForm({
   ...form,
   [e.target.name]:e.target.value
  });

 };

 const search = async ()=>{

  const res = await axios.get(

   `http://localhost:5000/api/match/
   ${form.location}/${form.budget}/${form.mother_tongue}/${form.region}/${form.occupation}/${form.age}`

  );

  setUsers(res.data);

 };

 return(

  <div className="container mt-5">

   <h2 className="mb-4">Find Compatible Roommates</h2>

   <input className="form-control mb-2" name="location" placeholder="Location" onChange={handleChange}/>
   <input className="form-control mb-2" name="budget" placeholder="Budget" onChange={handleChange}/>
   <input className="form-control mb-2" name="mother_tongue" placeholder="Mother Tongue" onChange={handleChange}/>
   <input className="form-control mb-2" name="region" placeholder="Region" onChange={handleChange}/>
   <input className="form-control mb-2" name="occupation" placeholder="Occupation" onChange={handleChange}/>
   <input className="form-control mb-2" name="age" placeholder="Age" onChange={handleChange}/>

   <button className="btn btn-dark mb-4" onClick={search}>
    Find Matches
   </button>

   <div className="row">

    {users.map(user =>(

     <div className="col-md-4" key={user.id}>

      <div className="card shadow p-3">

       <h5>{user.name}</h5>

       <p>Location: {user.preferred_location}</p>
       <p>Budget: ₹{user.budget}</p>
       <p>Language: {user.mother_tongue}</p>

       <h6 className="text-success">
        Match Score: {user.matchScore}%
       </h6>

      </div>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Matches;