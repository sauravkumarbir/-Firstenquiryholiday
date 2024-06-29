import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    let[loginData, processData] = useState( {} );

    const pickValue = (obj) =>{
        loginData[obj.target.name] = obj.target.value;
        processData( loginData );
    }

    let[msg, updateMsg] = useState("");
    const save = (obj) =>{
        obj.preventDefault();
        updateMsg("Please Wait...");
        let url = "https://cybotrix.com/webapi/login/tcreateaccount"; // post / { email: "admin1@gmail.com", password: "454545" }
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify(loginData)
        }
        fetch(url, postData)
        .then(response=>response.text())
        .then(info=>{
            updateMsg(info);
            obj.target.reset();
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
                            <i className="fa fa-user-plus"></i> Create Account
                        </h3>
                        <p className="text-center text-warning">  </p>
                        <form onSubmit={save}>
                            <div className="mb-3">
                                <label> Your Name <i className="text-danger">*</i> </label>
                                <input type="text" className="form-control" name="name" onChange={pickValue}/>
                            </div>
                            <div className="mb-3">
                                <label> Your email id <i className="text-danger">*</i> </label>
                                <input type="email" className="form-control" name="email" onChange={pickValue}/>
                            </div>
                            <div className="mb-3">
                                <label> Password <i className="text-danger">*</i> </label>
                                <input type="password" className="form-control" name="password" onChange={pickValue}/>
                            </div>
                            <div className="mb-3">
                                <label> Mobile No <i className="text-danger">*</i> </label>
                                <input type="number" className="form-control" name="mobile" onChange={pickValue}/>
                            </div>
                            <div className="mb-3">
                                <label> City / Location <i className="text-danger">*</i> </label>
                                <select className="form-select" name="city" onChange={pickValue}>
                                    <option value=""> Choose </option>
                                    <option> Bangalore </option>
                                    <option> Mumbai </option>
                                    <option> Pune </option>
                                    <option> Chennai </option>
                                    <option> Delhi </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label> User Type <i className="text-danger">*</i> </label>
                                <select className="form-select" name="type" onChange={pickValue}>
                                    <option value=""> Choose </option>
                                    <option> USER </option>
                                    <option> AGENT </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label> Full Address <i className="text-danger">*</i> </label>
                                <textarea className="form-control" name="address" onChange={pickValue}></textarea>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger">
                                    Register <i className="fa fa-arrow-right"></i></button>
                            </div>
                        </form>
                    </div>
                    <p className="text-center mt-4"> 
                        <Link to="/login" className="text-decoration-none">
                            <i className="fa fa-check"></i> Already Registered ? Login 
                        </Link>
                    </p>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Register;