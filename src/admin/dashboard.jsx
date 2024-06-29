import { useState, useEffect } from "react";
const AdminDashboard = () => {

    let [alllocation, updateAllLocation] = useState([]);
    const getLocation = async () => {
        let url = "https://cybotrix.com/webapi/holiday/alllocation";
        try {
            await fetch(url)
                .then(response => response.json())
                .then(location => {
                    updateAllLocation(location);
                })
        } catch (error) {
            alert("Network Error.. Please Try After Sometime");
        }
    }



    let [allplace, updatePlace] = useState([]);
    const getPlace = async () => {
        let url = "https://cybotrix.com/webapi/holiday/allplace";
        try {
            await fetch(url)
                .then(response => response.json())
                .then(location => {
                    updatePlace(location);
                })
        } catch (error) {
            alert("Network Error.. Please Try After Sometime");
        }
    }

    let [allpackage, updatepackage] = useState([]);
  const getpackage = () => {
    let agentid = localStorage.getItem("mytoken");

    let url = "https://cybotrix.com/webapi/holiday/allpackage"; // post / { email: "admin1@gmail.com", password: "454545" }
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ agentid: agentid }),
    };
    fetch(url, postData)
      .then((response) => response.json())
      .then((info) => {
        updatepackage(info);
      });
  };

    useEffect(() => {
        getLocation();
        getPlace()
        getpackage()
    }, []);

    return (
        <div className="conatiner mt-4">
            <div className="row">
                <div className="col-lg-12 text-center mb-5">
                    <h3 className="mb-4">My Dashboard</h3>
                </div>
                <div className="col-lg-4 text-center mb-5">
                    <div className="p-4 shadow">
                        <i className="fa fa-building fa-4x text-info mb-3"></i>
                        <h4>{alllocation.length} Tour Locations</h4>
                    </div>
                </div>
                <div className="col-lg-4 text-center mb-5">
                    <div className="p-4 shadow">
                        <i className="fa fa-map-marker fa-4x text-warning mb-3"></i>
                        <h4>{allplace.length} Tourist Places</h4>
                    </div>
                </div>
                <div className="col-lg-4 text-center mb-5">
                    <div className="p-4 shadow">
                        <i className="fa fa-suitcase fa-4x text-warning mb-3"></i>
                        <h4>{allpackage.length} Tourist Packages</h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard