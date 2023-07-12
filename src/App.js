import { useState } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";
import NextDaysWeather from "./components/NextDaysWeather";
import DelayCalculation from "./components/DelayCalculation";
import {Box, Link, CssBaseline, Typography, Container, Stack} from "@mui/material";
import Introduction from "./components/Introduction";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DetailFooter from "./components/DetailFooter";

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

    const gradientBgStyle = {
        background: 'linear-gradient(to bottom, #4645d8 70%, #fff 30%)',
    };

    return (
        <>
        <CssBaseline />
                <Box
                    sx={{
                        width: "100%",
                    }}>

                    <Box sx={{width: "100%", height: "5rem", display: "flex", alignItems: "center", color: "white", backgroundColor: "#4645d7"}}>
                        <Link href="" sx={{ color: "white", textDecoration: "none" }}>
                            <Stack direction="row" gap={1} marginLeft="2rem">
                                <HourglassEmptyIcon sx={{fontSize: 30}} />
                                <Typography variant="h5" sx={{ fontWeight: "600", }}>Flight Delay</Typography>
                            </Stack>
                        </Link>
                    </Box>
                
                    <Box
                        sx={{
                            backgroundColor: "#4645d8",
                            width: "100%",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}>

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                alignContent: "center",
                                padding: "1rem",
                            }}>
                        
                            <Introduction />
                        </Box>

                        <Box
                            style={gradientBgStyle}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                alignContent: "center",
                                flexDirection: "column",
                            }}>

                            <Container maxWidth="xl" sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "right",
                                    alignContent: "flex-end",
                                    justifyContent: "flex-end",
                                    alignSelf: "right",
                                    color: "white",
                                    marginBottom: "1rem"}}>


                                <Stack sx={{
                                    display: "flex",
                                    alignItems: "right",
                                    alignContent: "flex-end",
                                    justifyContent: "flex-end"}}>

                                    <Typography variant="h5">Check before you buy a ticket</Typography>
                                    <SwitchAccessShortcutIcon sx={{transform: 'rotate(180deg)', alignSelf: "flex-end", fontSize: 30}} />
                                </Stack>
                                
                            </Container>
                        
                            <SearchFlight onFlightData={handleFlightData} loadingStatus={loadingStatus} />
                        </Box>

                    </Box>

                    <DelayCalculation flightData={flightData} fetchComplete={fetchComplete} />

                    <Box
                        sx={{
                            width: "100%",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: "1rem",
                            marginTop: "5rem",
                            marginBottom: "5rem",
                        }}>
                    
                        <NextDaysWeather />
                    
                    </Box>

                    <DetailFooter />
                </Box>
        </>
    );
}

export default App;