import React, { useState, useEffect} from "react";
import "./index.css";
import "../main_style/index.css";

const Vehicles = () => {
    const[vehicles, setVehicles] = useState([]);
    const [count,setCount] = useState(1);
    const [addUrl,setAddUrl] = useState(false);

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
                    <input className="search_input" placeholder="Enter the name of the Vehicles you want to find"></input>
                    <button className="search_button">Search</button>
                </div>
                <div className="columns">
                        {vehicles?.map((vehicles, i) => {
                           return (
                               <div key={i}>
                                   <p className="name">
                                       {vehicles.name}
                                   </p>
                               </div>
                           ) 
                        })}
                </div>  
                <button className="addMore_button" disabled={count > 3} onClick={() => setCount(count + 1)}>Add more</button> 
            </div>       
        </div>
    );
};

export default Vehicles;