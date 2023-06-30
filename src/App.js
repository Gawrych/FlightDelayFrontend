import { useState, useEffect } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";
import NextDaysWeather from "./components/NextDaysWeather";
import {Box, Container, Grid, CssBaseline} from "@mui/material";
import PlaneVertical from "./static/images/planeVertical.jpg";
import axios from "axios"

const NEXT_WEATHER_URL = "http://localhost:8080/api/v1/weather/periods?days=7";

function App() {
    const [nextDaysWeatherRecords, setNextDaysWeatherRecords] = useState(null);


    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: 'EPWA', phase: 'DEPARTURE' })
        };

        const fetchNextDaysWeather = async () => {

            const data = await fetch(NEXT_WEATHER_URL, requestOptions)
                .then(response => response.json());

            setNextDaysWeatherRecords(data);
            console.log(nextDaysWeatherRecords);
        };

        fetchNextDaysWeather();
    }, []);

    const handleFlightData = (data) => {
        console.log("Arrival airport ICAO:", data.arrivalAirport);
        console.log("Departure airport ICAO:", data.departureAirport);

        console.log("Arrival date:", data.arrivalDate);
        console.log("Departure date:", data.departureDate);
    }

    return (
        <>
        <CssBaseline />
        <main>
            <div>
                <Box
                    sx={{
                        // backgroundImage: `url(${PlaneVertical})`,
                        height: "300vh",
                        width: "100%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}>
                
                    <SearchFlight onFlightData={handleFlightData} />

                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                width: "100%",
                                backgroundSize: "cover",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(230, 230, 230, 0.8)",
                                padding: "1rem",
                                borderRadius: "4px",
                                boxShadow: "1",
                            }}>
                        
                            <NextDaysWeather nextDaysWeatherRecords={nextDaysWeatherRecords} />
                        
                        </Box>
                    </Container>
                </Box>
            </div>
        </main>
        </>
    );
}

export default App;