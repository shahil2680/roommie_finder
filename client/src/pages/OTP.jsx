import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP(){

 const [otp,setOtp] = useState("");
 const navigate = useNavigate();
 const mobile = localStorage.getItem("mobile");

 const verify = async () => {

  const res = await axios.post(
   "http://localhost:5000/api/auth/verify-otp",
   {mobile,otp}
  );

  localStorage.setItem("token",res.data.token);

  navigate("/dashboard");
 };

 return(

  <div className="container vh-100 d-flex justify-content-center align-items-center">

   <div className="card p-4 shadow" style={{width:"350px"}}>

    <h4 className="text-center mb-3">OTP Verification</h4>

    <input
     className="form-control mb-3"
     placeholder="Enter OTP"
     value={otp}
     onChange={(e)=>setOtp(e.target.value)}
    />

    <button
     className="btn btn-primary w-100"
     onClick={verify}
    >
     Verify OTP
    </button>

   </div>

  </div>

 );

}

export default OTP;