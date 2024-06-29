import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Register from "./register";

const HomeApp = () =>{
    return(
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </HashRouter>
    )
}
export default HomeApp;
