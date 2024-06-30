import { HashRouter, Routes, Route ,Link } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import AllPackage from "./allpackage";

const HomeApp = () =>{
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
                                <Link className="nav-link active" to="/"><i className="fa fa-calendar"></i> Holiday Package</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/register"><i className="fa fa-user-plus"></i> New Agent</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/login"><i className="fa fa-lock"></i> Agent Login</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav> 

            <Routes>
                <Route exact path="/" element={<AllPackage/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </HashRouter>
    )
}
export default HomeApp;
