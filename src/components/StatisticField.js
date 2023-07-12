import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Stack,
    Tooltip,
} from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { calculateRanking, calculateDelayTime, calculatePercentageChance, calculateForecastToDelayChance } from "./DelayTimeCalculator";

const StatisticField = ({ phase, statisticsData, weatherData, airportName, nextDaysWeatherData }) => {
    const [airportChangeByWeather, setAirportChangeByWeather] = useState("");

    let icon = "";

    const iconStyle = {
        color: "#4645d7", fontSize: "1.8rem", backgroundColor: "#E4F1FF", padding: "0.2rem", borderRadius: "0.3rem", marginRight: "0.5rem"
    };

    if (phase === "Departure") {
        icon = <FlightTakeoffIcon  style={iconStyle}/>;
    } else {
        icon = <FlightLandIcon style={iconStyle} />;
    }

    const airportType = phase + " airport";

    useEffect(() => {
        if (nextDaysWeatherData.length !== 0) {

            const increaseByWeather = calculateForecastToDelayChance(nextDaysWeatherData);
            if (increaseByWeather === 0) {
                setAirportChangeByWeather();
            } else if (increaseByWeather === 1) {
                setAirportChangeByWeather("will increase");
            } else if (increaseByWeather === 2) {
                setAirportChangeByWeather("will increase significantly");
            }
        }
    }, [nextDaysWeatherData]);

    return (
        <Grid item xs={12} sm={12} md={5} lg={5}>
            <Box gap={3} sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        padding: "2rem",
                        paddingTop: "1rem",
                        boxShadow: "2",
                        borderBottomWidth: "1px",
                        borderBottomColor: "#2969EA",
                        borderBottomStyle: "solid",
                    }}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                    }}>
                        
                        <Tooltip title={airportType}>

                            {icon}

                        </Tooltip>

                        <Tooltip title={airportType}>

                            <Typography variant="title">{airportName}</Typography>

                        </Tooltip>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Stack width="70%">
                            <Tooltip title="Delay chance" placement="bottom-start">
                                <Typography variant="h4" sx={{ fontWeight: "600", color: "#4645d7" }}>{calculatePercentageChance(statisticsData, weatherData)}%</Typography>
                            </Tooltip>

                            {airportChangeByWeather && <Typography variant="body2" sx={{ fontWeight: "600", color: "#e69241"}}>The probability of delays {airportChangeByWeather} in the upcoming days</Typography>}
                            
                        </Stack>

                        <Tooltip title="On this airport delays are rarely and short">
                            <Stack  sx={{ fontWeight: "600", color: "#4645d7", display: "flex", alignItems: "center", width:"30%" }}>
                                <ThumbUpAltIcon sx={{ fontWeight: "600", color: "#4645d7" }} />
                                <Typography variant="caption" sx={{ fontWeight: "600", color: "#4645d7" }}>Good choice</Typography>
                                
                            </Stack>
                        </Tooltip>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>

                    <Box
                        sx={{
                            width: "100%",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Typography variant="body2" sx={{ fontWeight: "600", color: "#bebdc0", textAlign: "left" }}>
                                The airport has been ranked <span style={{ color: "#28AF5F", backgroundColor: "#e7fce9", padding: '0.3rem' }}> in the top {calculateRanking(statisticsData)}</span> among European airports
                            </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Typography variant="body2" component="span" sx={{ fontWeight: "600", color: "#bebdc0", textAlign: "right"}}>
                            In the event of the most common delay, the estimated time is 
                            <span  style={{ color: "#4645d7", backgroundColor: "#E4F1FF", padding: "0.3rem"}}>~{calculateDelayTime(statisticsData)} minutes</span>
                        </Typography>
                    </Box>
                        
                </Box>
            </Box>
        </Grid>
    );
};

export default StatisticField;