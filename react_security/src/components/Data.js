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
            };
            getData();
        }
    }, []);

    console.log("starwars", starwars);
    if (loggedIn) {
        return (
            <div>
                <table>
                    <thead><tr><td><b>Name</b></td><td><b>URL</b></td></tr></thead>
                    <tbody>
                        {starwars.map((data) => (
                            <tr key={uuid()}>
                                <td>{data.name}</td>
                                <td>{data.url}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )
    } else {
        return (
            <div>
                <h2> Please login</h2>
            </div >
        )
    }
}
export default Data;