import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Matches from "./pages/Matches";
import OTP from "./pages/OTP";
import Properties from "./pages/Properties";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login/>}/>
    <Route path="/otp" element={<OTP/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/create-profile" element={<CreateProfile/>}/>
    <Route path="/matches" element={<Matches/>}/>
    <Route path="/properties" element={<Properties/>}/>

   </Routes>

  </BrowserRouter>

 );

}

export default App;