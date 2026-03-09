import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

 const [mobile,setMobile] = useState("");
 const navigate = useNavigate();

 const sendOTP = async () => {

  await axios.post(
   "http://localhost:5000/api/auth/send-otp",
   {mobile}
  );

  localStorage.setItem("mobile",mobile);

  navigate("/otp");
 };

 return(

  <div className="container-fluid vh-100">

   <div className="row h-100">

    <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">

      <img
       src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
       style={{width:"60%"}}
       alt="roommates"
      />

    </div>


    <div className="col-md-6 d-flex align-items-center justify-content-center">

     <div className="card shadow p-4" style={{width:"350px"}}>

      <h3 className="text-center mb-4">Roommate Finder</h3>

      <input
       className="form-control mb-3"
       placeholder="Enter mobile number"
       value={mobile}
       onChange={(e)=>setMobile(e.target.value)}
      />

      <button
       className="btn btn-dark w-100"
       onClick={sendOTP}
      >
       Get OTP
      </button>

     </div>

    </div>

   </div>

  </div>

 );

}

export default Login;