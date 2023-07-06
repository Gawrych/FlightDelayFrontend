import { useState } from "react";
import React from 'react';
import SearchFlight from "./components/SearchFlight";
import NextDaysWeather from "./components/NextDaysWeather";
import DelayCalculation from "./components/DelayCalculation";
import {Box, CssBaseline, Typography, Container, Stack} from "@mui/material";
import PlaneVertical from "./static/images/planeVertical.jpg";
import Introduction from "./components/Introduction";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


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
                <Box
                    sx={{
                        height: "300vh",
                        width: "100%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}>
                
                    <Box
                        sx={{
                            backgroundColor: "#4645d7",
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
                            sx={{
                                height: "30vh",
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
                                    justifyContent: "space-between",
                                    alignSelf: "right",
                                    color: "white",
                                    marginBottom: "1rem"}}>

                                <Stack direction="row" sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    }}>
                                    <InfoOutlinedIcon sx={{fontSize: 25}} />
                                    
                                </Stack>

                                <Stack sx={{
                                    display: "flex",
                                    alignItems: "right",
                                    alignContent: "flex-end",
                                    justifyContent: "flex-end",
                                    
                                    }}>

                                    <Typography variant="h5">Let's check</Typography>
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
                                backgroundRepeat: "no-repeat",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>

                        </Box>
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
        </>
    );
}

export default App;