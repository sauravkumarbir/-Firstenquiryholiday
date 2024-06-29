
import { useState, useEffect } from "react";

const TourPlaces = () =>{
    let[msg, updateMsg] = useState("");
    let[alllocation, updateAllLocation] = useState([]);
    const getLocation = async() =>{
        let url = "https://cybotrix.com/webapi/holiday/alllocation";
        try{
        await fetch(url)
        .then(response=>response.json())
        .then(location=>{
            updateAllLocation(location);
        })
        }catch(error){
            updateMsg("Network Error.. Please Try After Sometime");
        }
    }
    useEffect(()=>{
        getLocation();
        getPlace();
    }, []);


    // save the value 
    let[placeData, processData] = useState( {} );

    const pickValue = (obj) =>{
        placeData[obj.target.name] = obj.target.value;
        processData( placeData );
    }

    const save = (obj) =>{
        obj.preventDefault();
        updateMsg("Please Wait...");
        let url = "https://cybotrix.com/webapi/holiday/saveplace"; // post / { email: "admin1@gmail.com", password: "454545" }
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify(placeData)
        }
        fetch(url, postData)
        .then(response=>response.text())
        .then(info=>{
            updateMsg(info);
            obj.target.reset();
            getPlace(); // to reload the list
        })
    }


    let[allplace, updatePlace] = useState([]);
    const getPlace = async() =>{
        let url = "https://cybotrix.com/webapi/holiday/allplace";
        try{
        await fetch(url)
        .then(response=>response.json())
        .then(location=>{
            updatePlace(location);
        })
        }catch(error){
            updateMsg("Network Error.. Please Try After Sometime");
        }
    }

    return(
        <div className='container mt-4'>
            <form onSubmit={save}>
                <div className='row'>
                    <h3 className='text-center col-lg-12 mb-4'> Enter New Tour Place </h3>
                    <p className='text-danger text-center'> {msg} </p>
                    <div className="col-xl-3 mb-3">
                        <label> City Name </label>
                        <select className="form-select" name="cityid" onChange={pickValue}>
                            <option value=""> Choose </option>
                            {
                                alllocation.map((loc, index)=>{
                                    return(
                                        <option value={loc.id} key={index}> {loc.cityname} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-xl-3 mb-3">
                        <label> Place Name </label>
                        <input type="text" className="form-control" name="placename" onChange={pickValue}/>
                    </div>
                    <div className="col-xl-3 mb-3">
                        <label> Place Photo </label>
                        <input type="text" className="form-control" name="photo" onChange={pickValue}/>
                    </div>
                    <div className="col-xl-3 mb-3">
                        <label> Min to Max Temperature  </label>
                        <input type="text" className="form-control" name="temp" onChange={pickValue}/>
                    </div>
                    <div className="col-xl-4 mb-3">
                        <label> About This Place  </label>
                        <textarea className="form-control" name="about" onChange={pickValue}></textarea>
                    </div>
                    <div className="col-xl-4 mb-3">
                        <label> History Of Place  </label>
                        <textarea className="form-control" name="history" onChange={pickValue}></textarea>
                    </div>
                    <div className="col-xl-4 mb-3">
                        <br/>
                        <button className="btn btn-primary me-3" type="submit"> Submit </button>
                        <button className="btn btn-warning" type="reset"> Reset </button>
                    </div>
                </div>
            </form>

            <div className="row mt-5">
                <h3 className='text-center col-lg-12 mb-4'> Available Tour Places : {allplace.length} </h3>
                <div className="col-lg-4">
                    <select className="form-select">
                        <option value=""> Serch By City </option>
                            {
                                alllocation.map((loc, index)=>{
                                    return(
                                        <option value={loc.id} key={index}> {loc.cityname} </option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <input type="text" className="form-control" placeholder="Search"/>
                </div>
            </div>
            <br/>

            {
                allplace.map((place, index)=>{
                    return(
                        <div className="row mb-4" key={index}>
                            <div className="col-lg-3"> <h3> {place.placename} </h3></div>
                            <div className="col-lg-3"> <img src={place.photo} height="150" width="100%" className="rounded"/> </div>
                            <div className="col-lg-3"> <p> {place.about} </p></div>
                            <div className="col-lg-3"> <p> {place.history} </p></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TourPlaces;