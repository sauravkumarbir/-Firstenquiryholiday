
import {useState, useEffect} from 'react';

const Location = () =>{
    let[city, pickCity] = useState( [] );
    let[msg, updateMsg] = useState("");
    const save = (obj) =>{
        obj.preventDefault();
        if(city==""){
            updateMsg("Please Enter Location Name");
        }else{
            updateMsg("Please Wait...");
            let url = "https://cybotrix.com/webapi/holiday/savelocation"; 
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify( {"cityname":city} )
        }
        fetch(url, postData)
        .then(response=>response.text())
        .then(info=>{
            updateMsg(info);
            obj.target.reset();
            getLocation(); // to reload the list
        })
        }
    }

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
    }, []);

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-lg-3'></div>
                <div className='col-lg-6'>
                    <h3 className='text-center'> Manage Tour Location </h3>
                    <p className='text-danger text-center'> {msg} </p>
                    <form onSubmit={save}>
                        <div className='text-center'>
                            Enter Location Name : <input type="text" className='m-3'
                            onChange={obj=>pickCity(obj.target.value)}/>
                            <button className='btn btn-primary m-3'> Save </button>
                        </div>
                    </form>

                    <table className='table table-bordered mt-4'>
                        <thead>
                            <tr>
                                <th> #ID </th>
                                <th> Location Name </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            alllocation.map((location, index)=>{
                                return(
                                    <tr key={index}>
                                        <td> {location.id} </td>
                                        <td> {location.cityname} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                <div className='col-lg-3'></div>
            </div>
        </div>
    )
}

export default Location;