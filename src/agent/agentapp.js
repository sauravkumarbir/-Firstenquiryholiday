import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Location from "../admin/location";
import TourPlaces from "../admin/tourplaces";
import TourPackage from "../admin/tourpackage";
import AdminDashboard from "../admin/dashboard";



const AgentApp = () =>{
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
                <div className="container">
                    <a className="navbar-brand">
                        <i className="fa fa-search text-warning fa-lg"></i> FirstEnquiry Holiday 
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/admindashboard"><i className="fa fa-home"></i> Dashboard</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/city"><i className="fa fa-building"></i> Manage City</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/tourplace"><i className="fa fa-map-marker"></i> Manage Places</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/tourpackage"><i className="fa fa-suitcase"></i> Manage Packages</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link text-warning" onClick={logout}>
                                    Welcome - {localStorage.getItem("myname") }  Logout <i className="fa fa-power-off"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> 

            <Routes>
                <Route exact path="/city" element={<Location/>} />
                <Route exact path="/tourplace" element={<TourPlaces/>} />
                <Route exact path="/tourpackage" element={<TourPackage/>} />
                <Route exact path="/admindashboard" element={<AdminDashboard/>} />
            </Routes>
             
        </HashRouter>
    )
}

export default AgentApp;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/";
    window.location.reload();
}