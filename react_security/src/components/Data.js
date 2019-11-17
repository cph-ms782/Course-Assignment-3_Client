import React, { useState, useEffect } from "react";
import facade from "./loginFacade";
import uuid from "uuid/v1";

function Data({ loggedIn }) {
    console.log("Data");
    console.log("loggedIn", loggedIn);
    const [starwars, setStarwars] = useState([]);

    useEffect(() => {
        if (loggedIn) {
            const getData = async () => {
                try {
                    const data = await facade.fetchSW();
                    console.log("data", data);
                    setStarwars(data);
                } catch (e) {
                    console.log("err", e);
                }
            }
            getData();
        }
    }, []);

    console.log("starwars", starwars);
    if (loggedIn) {
        return (
            <div>
                <ul key={uuid()}>
                    {starwars.map((data) =>
                        <li key={uuid()}>Name: {data.name} &emsp;&emsp;&emsp;&emsp;  URL: {data.url} </li>
                    )}
                </ul>
            </div >
        )
    } else {
        return (
            <div>
                <h2> please login</h2>
            </div >
        )
    }
}
export default Data;