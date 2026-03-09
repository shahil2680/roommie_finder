import { Link } from "react-router-dom";

function Dashboard(){

 return(

  <div className="container mt-5">

   <h2 className="text-center mb-5">
    Roommate Finder Dashboard
   </h2>

   <div className="row text-center">

    <div className="col-md-4">

     <div className="card p-4 shadow">

      <i className="bi bi-person-circle fs-1"></i>

      <h5 className="mt-3">Create Profile</h5>

      <Link to="/create-profile" className="btn btn-dark mt-2">
        Open
      </Link>

     </div>

    </div>

    <div className="col-md-4">

     <div className="card p-4 shadow">

      <i className="bi bi-people fs-1"></i>

      <h5 className="mt-3">Find Roommates</h5>

      <Link to="/matches" className="btn btn-dark mt-2">
        Search
      </Link>

     </div>

    </div>

    <div className="col-md-4">

     <div className="card p-4 shadow">

      <i className="bi bi-house fs-1"></i>

      <h5 className="mt-3">Properties</h5>

      <Link to="/properties" className="btn btn-dark mt-2">
        View
      </Link>

     </div>

    </div>

   </div>

  </div>

 );

}

export default Dashboard;