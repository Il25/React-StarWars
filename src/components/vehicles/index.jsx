import React, { useState, useEffect} from "react";
import "./index.css";
import "../main_style/index.css";
import { Link } from "react-router-dom";

const Vehicles = () => {
    const[vehicles, setVehicles] = useState([]);
    const [count,setCount] = useState(1);
    const [addUrl,setAddUrl] = useState(false);
    const [searchVehicles, setSearchVehicles] = useState("");

    const getVehicles = async(url) => {
        const response = await fetch(url);
        let data = await response.json();
        setVehicles([...vehicles, ...data.results]);
        setAddUrl(data.next);
    };

    useEffect(() => {
        getVehicles("https://swapi.dev/api/vehicles");
    }, []);

    useEffect(() => {
        getVehicles(addUrl);
    }, [count]);

    return (
        <div className="search_container">
            <div className="search_descr">
                Here you can find all information about vehicles
            </div>
            <div>
                <div className="search_div">
                    <input type="text" className="search_input" placeholder="Enter the name of the Vehicles you want to find" onChange={(event) => setSearchVehicles(event.target.value)}></input>
                </div>
                {vehicles?.filter((vehicles) => {
                    if(searchVehicles == "") {
                        return vehicles
                    } else if(vehicles.name.toLowerCase().includes(searchVehicles.toLowerCase())) {
                        return vehicles
                    }
                }).map((vehicles, i) => {
                    let num = vehicles.url.length;
                    return (
                        <div className="columns">
                            <div key={i}>
                                <p className="name">
                                    <Link to={`/vehicles/${num}`}>
                                        {vehicles.name}
                                    </Link>
                                </p>
                            </div>
                        </div>  
                    ) 
                })}
                <button className="addMore_button" disabled={count > 3} onClick={() => setCount(count + 1)}>Add more</button> 
            </div>       
        </div>
    );
};

export default Vehicles;