import { useState } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";
import NextDaysWeather from "./components/NextDaysWeather";
import DelayCalculation from "./components/DelayCalculation";
import {Box, CssBaseline} from "@mui/material";
import PlaneVertical from "./static/images/planeVertical.jpg";


function App() {
    const [flightData, setFlightData] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const handleFlightData = (data) => {
        setLoadingStatus(true);
        setFlightData(data);
    }

    const fetchComplete = () => {
        setLoadingStatus(false);
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
                
                    <SearchFlight onFlightData={handleFlightData} loadingStatus={loadingStatus} />

                    <DelayCalculation flightData={flightData} fetchComplete={fetchComplete} />

                    <Box
                        sx={{
                            width: "100%",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f8f8f8",
                            padding: "2rem",
                            borderRadius: "4px",
                            boxShadow: "1",
                        }}>
                    
                        <NextDaysWeather />
                    
                    </Box>
                </Box>
            </div>
        </main>
        </>
    );
}

export default App;