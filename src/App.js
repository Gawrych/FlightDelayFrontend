import { useState, useEffect } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";

function App() {

    const [flightData, setFlightData] = useState(null);

    const handleFlightData = (data) => {
        setFlightData(data);
        console.log("Arrival airport ICAO:", data.arrivalAirport);
        console.log("Departure airport ICAO:", data.departureAirport);

        console.log("Arrival date:", data.arrivalDate);
        console.log("Departure date:", data.departureDate);
    }

    return (
        <>
            <SearchFlight onFlightData={handleFlightData} />
        </>
    );
}

function parseDateToPattern(date) {
    const parts = date.toString().split("/"); // Split the date string into parts [month, day, year]

    // Create a new Date object using the parts
    const dateObject = new Date(parts[2], parts[0] - 1, parts[1]);

    // Format the date in "yyyy-MM-dd" pattern
    return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
}

export default App;