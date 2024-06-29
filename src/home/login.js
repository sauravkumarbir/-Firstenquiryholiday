import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    let[loginData, processData] = useState( {} );

    const pickValue = (obj) =>{
        loginData[obj.target.name] = obj.target.value;
        processData( loginData );
    }

    let[msg, updateMsg] = useState("");
    const loginCheck = (obj) =>{
        obj.preventDefault();
        updateMsg("Please Wait...");
        let url = "https://cybotrix.com/webapi/login/tlogin"; // post / { email: "admin1@gmail.com", password: "454545" }
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify(loginData)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(info=>{
            updateMsg(info.message);
            if(info.status=="SUCCESS"){
                localStorage.setItem("type", info.type);
                localStorage.setItem("mytoken", info.tokenno);
                localStorage.setItem("myname", info.name);
                window.location.reload();
            }
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="text-center mb-4">
                        <i className="fa fa-plane fa-4x text-info"></i>
                        <p className="text-danger pt-1"> {msg} </p>
                    </div>
                    <div className="border p-3 rounded border-primary">
                        <h3 className="text-center mb-3 text-danger">
                            <i className="fa fa-lock"></i> Login
                        </h3>
                        <p className="text-center text-warning">  </p>
                        <form onSubmit={loginCheck}>
                            <div className="mb-3">
                                <label> Your email id <i className="text-danger">*</i> </label>
                                <input type="email" className="form-control" name="email" onChange={pickValue}/>
                            </div>
                            <div className="mb-3">
                                <label> Password <i className="text-danger">*</i> </label>
                                <input type="password" className="form-control" name="password" onChange={pickValue}/>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger">
                                    Login <i className="fa fa-arrow-right"></i></button>
                            </div>
                        </form>
                    </div>
                    <p className="text-center mt-4"> 
                        <Link to="/register" className="text-decoration-none">
                            <i className="fa fa-user-plus"></i> Are You New ? Create Account 
                        </Link>
                    </p>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Login;