import { useEffect, useState } from "react";

const AllPackage = () => {

    let [alllocation, updateAllLocation] = useState([]);
    const getLocation = async () => {
        let url = "https://cybotrix.com/webapi/holiday/alllocation";
        try {
            let response = await fetch(url);
            let location = await response.json();
            updateAllLocation(location);
        } catch (error) {
            alert("Network Error.. Please Try After Sometime");
        }
    }

    let [allplace, updatePlace] = useState([]);
    const getPlace = async () => {
        let url = "https://cybotrix.com/webapi/holiday/allplace";
        try {
            let response = await fetch(url);
            let location = await response.json();
            updatePlace(location);
        } catch (error) {
            alert("Network Error.. Please Try After Sometime");
        }
    }

    let [allpackage, updatepackage] = useState([]);
    const getpackage = async () => {
        let url = "https://cybotrix.com/webapi/holiday/packageforbooking"; 
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ /* your payload here */ })
        };
        try {
            let response = await fetch(url, postData);
            let info = await response.json();
            updatepackage(info);
        } catch (error) {
            alert("Network Error.. Please Try After Sometime");
        }
    };

    useEffect(() => {
        getLocation();
        getPlace();
        getpackage();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="shadow p-3">
                        <h3 className="mb-3 fs-5">Popular Tourist Places</h3>
                        {
                            allplace.map((place, index) => (
                                <div className="row mb-4" key={index}>
                                    <div className="col-lg-5">
                                        <img src={place.photo} className="img-fluid rounded" alt={place.placename} />
                                    </div>
                                    <div className="col-lg-7">
                                        <p>{place.placename}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-lg-7">
                    {
                        allpackage.map((mypackage, index) => (
                            <div className="row mb-4 shadow p-3" key={index}>
                                <div className="col-lg-10 col-10">
                                    <h4>{mypackage.pname}</h4>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <img src={mypackage.photo} className="img-fluid rounded" alt={mypackage.pname} />
                                        </div>
                                        <div className="col-lg-7">
                                            <p>Total: {mypackage.days}</p>
                                            <p>Food: {mypackage.food}</p>
                                            <p>Transport: {mypackage.transport}</p>
                                            <p>Accommodation: {mypackage.accomodation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 text-end pt-5">
                                    <button className="btn btn-info">Add Place</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-lg-2">
                    <div className="shadow rounded p-3">
                        <h4 className="fs-5">Tourist Places</h4>
                        {
                            alllocation.map((loc, index) => (
                                <p className="text-primary mb-2" key={index}>{loc.cityname}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllPackage;
