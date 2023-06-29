import { useState, useEffect } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";
import {Box} from "@mui/material";
import PlaneVertical from "./static/images/planeVertical.jpg";

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
            <Box
                sx={{
                    backgroundImage: `url(${PlaneVertical})`,
                    height: "500vh",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <SearchFlight onFlightData={handleFlightData} />
            </Box>
        </>
    );
}

export default App;