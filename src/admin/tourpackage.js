import { useEffect, useState } from "react";
const TourPackage = () => {
  //save the place
  let [placeData, processData] = useState({});
  let [msg, updateMsg] = useState("");

  const pickValue = (obj) => {
    placeData[obj.target.name] = obj.target.value;
    processData(placeData);
  };

  const save = (obj) => {
    obj.preventDefault();
    placeData["agentid"] = localStorage.getItem("mytoken");

    updateMsg("Please Wait...");
    let url = "https://cybotrix.com/webapi/holiday/savepackage"; // post / { email: "admin1@gmail.com", password: "454545" }
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(placeData),
    };
    fetch(url, postData)
      .then((response) => response.text())
      .then((info) => {
        updateMsg(info.message);
        updateMsg(info);
        obj.target.reset();
        getpackage();
      });
  };
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

  //place list
  let [allplace, updateplace] = useState([]);
  const getplace = async () => {
    let url = "https://cybotrix.com/webapi/holiday/allplace";
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((location) => {
          updateplace(location);
        });
    } catch (error) {
      updateMsg("Network Error.. Please Try After Sometime");
    }
  };

  let [packageid, setpackageid] = useState("");

  const addplace = async (placeid) => {
    alert("your package id : " + packageid);
    let url = "https://cybotrix.com/webapi/holiday/addplaceinpackage";
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ placeid: placeid, packageid: packageid }),
    };

    try {
      await fetch(url, postData)
        .then((response) => response.text())
        .then((msg) => {
          alert(msg);
        });
    } catch (error) {
      alert("Network Error.. Please Try After Sometime");
    }
  };

  let [myplaces, setmypalces] = useState([]);
  const placeforpackage = async (mypackageid) => {
    setpackageid(mypackageid); //storing for delete purpose
    setmypalces([]);

    let url = "https://cybotrix.com/webapi/holiday/placebypackage";
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ packageid: mypackageid }),
    };

    try {
      await fetch(url, postData)
        .then((response) => response.json())
        .then((placeArray) => {
          setmypalces(placeArray);
        });
    } catch (error) {
      alert("Network Error.. Please Try After Sometime");
    }
  };

  const deletemyplace = async (placeid) => {
    let url = "https://cybotrix.com/webapi/holiday/deleteplacefrompackage";
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ placeid: placeid, packageid: packageid }),
    };

    try {
      await fetch(url, postData)
        .then((response) => response.text())
        .then((msg) => {
          alert(msg);
          placeforpackage(packageid);
        });
    } catch (error) {
      alert("Network Error.. Please Try After Sometime");
    }
  };

  useEffect(() => {
    getpackage();
    getplace();
  }, []);
  return (
    <div className="Container mt-5">
      <form onSubmit={save}>
        <div className="row">
          <h3 className="text-center col-lg-12 mb-4">Create Tour Package</h3>
          <p className="text-center text-danger">{msg}</p>
          <div className="col-xl-3 mb-3 ">
            <label>Package Name</label>
            <input
              type="text"
              className="form-control"
              name="pname"
              onChange={pickValue}
            />
          </div>{" "}
          <div className="col-xl-3 mb-3 ">
            <label>No. of days</label>
            <select className="form-select" name="days" onChange={pickValue}>
              <option>Choose</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="col-xl-3 mb-3 ">
            <label>Package Photo</label>
            <input
              type="text"
              className="form-control"
              name="photo"
              onChange={pickValue}
            />
          </div>
          <div className="col-xl-3 mb-3 ">
            <label>Cost Each Person</label>
            <input
              type="text"
              className="form-control"
              name="cost"
              onChange={pickValue}
            />
          </div>
          <div className="col-xl-3 mb-3">
            <label>Food</label>
            <select className="form-select" name="food" onChange={pickValue}>
              <option>Choose</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-xl-3 mb-3">
            <label>Transport</label>
            <select
              className="form-select"
              name="transport"
              onChange={pickValue}
            >
              <option>Choose</option>
              <option>Car</option>
              <option>Mini Bus</option>
              <option>Flight</option>
              <option>Train</option>
            </select>
          </div>
          <div className="col-xl-3 mb-3">
            <label>Accomodation</label>
            <select
              className="form-select"
              name="accomodation"
              onChange={pickValue}
            >
              <option>Choose</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-lg-2">
            <br></br>
            <button type="submit" className="btn btn-primary me-3">
              Submit
            </button>
            <button type="reset" className="btn btn-danger">
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="row mt-5">
        <h3 className="  text-center col-lg--8 mb-4">
          Available Package : {allpackage.length}
        </h3>
        <div className="col-lg-4">
          <input
            type="text "
            className="form-control mb-5"
            placeholder=" search"
          />
        </div>
      </div>
      {allpackage.map((mypackage, index) => {
        return (
          <div className="row mb-4 border p-3">
            <div className="col-lg-10 col-10">
              <h4>{mypackage.pname}</h4>
              <div className="row">
                <div className="col-lg-5">
                  {" "}
                  <img
                    src={mypackage.photo}
                    height="100"
                    width="150"
                    alt=""
                  ></img>
                </div>
                <div className="col-lg-5">
                  {" "}
                  <p> Total : {mypackage.days}</p>
                  <p> Total : {mypackage.food}</p>
                  <p> Total : {mypackage.transport}</p>
                  <p> Total : {mypackage.accomodation}</p>
                </div>
                <div className="col-lg-2 col-3 text-end pt-5">
                  <button
                    className="btn btn-info"
                    onClick={setpackageid.bind(this, mypackage.pid)}
                    data-bs-toggle="modal"
                    data-bs-target="#myplace"
                  >
                    {" "}
                    Add Place
                  </button>
                  <hr />
                  <button
                    className="btn btn-warning"
                    onClick={placeforpackage.bind(this, mypackage.pid)}
                    data-bs-toggle="modal"
                    data-bs-target="#place"
                  >
                    {" "}
                    show Places
                  </button>
                </div>{" "}
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="modal fade"
        id="myplace"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add places in package
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {allplace.map((place, index) => {
                return (
                  <div className="row mb-4" key={index}>
                    <div className="col-lg-3">
                      <h3>{place.placename}</h3>
                    </div>
                    <div className="col-lg-6">
                      <img src={place.photo} height="150" width="100%" />
                    </div>
                    <div className="col-lg-3">
                      <button
                        className="btn btn-danger btn-sm mt-4"
                        onClick={addplace.bind(this, place.placeid)}
                      >
                        select it
                      </button>{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="place"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                All places in this package
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {myplaces.map((place, index) => {
                return (
                  <div className="row mb-4" key={index}>
                    <div className="col-lg-12">
                      <h5>{place.placename}</h5>
                    </div>
                    <div className="col-lg-9">
                      <img src={place.photo} className="img-fluid rounded" />
                    </div>
                    <div className="col-lg-3">
                      <button
                        className="btn btn-danger btn-sm mt-4"
                        onClick={deletemyplace.bind(this, place.placeid)}
                      >
                        Delete it
                      </button>{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TourPackage;