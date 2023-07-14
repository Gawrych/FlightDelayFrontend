import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Stack,
    Tooltip,
} from "@mui/material";
import "../styles/DelayCard.css";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { calculateRanking, calculateDelayTime, calculatePercentageChance, calculateForecastToDelayChance } from "./DelayTimeCalculator";

const StatisticField = ({ phase, statisticsData, weatherData, airportName, nextDaysWeatherData }) => {
    const [airportChangeByWeather, setAirportChangeByWeather] = useState("");

    let icon = "";

    if (phase === "Departure") {
        icon = <FlightTakeoffIcon  className="flighPhaseIcon" />;
    } else {
        icon = <FlightLandIcon className="flighPhaseIcon" />;
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
            <Box gap={3} className="delayCardMainBox" boxShadow={3}>
                <Box className="boxForAirportTitleAndIcon">
                        
                        <Tooltip title={airportType}>

                            {icon}

                        </Tooltip>

                        <Tooltip title={airportType}>

                            <Typography variant="title">{airportName}</Typography>

                        </Tooltip>
                </Box>
                <Box className="centeredItemsContent">
                        <Stack width="70%">
                            <Tooltip title="Delay chance" placement="bottom-start">
                                <Typography variant="h4" className="boldBlueText">{calculatePercentageChance(statisticsData, weatherData)}%</Typography>
                            </Tooltip>

                            {airportChangeByWeather && <Typography variant="body2" className="boldOrangeText">The probability of delays {airportChangeByWeather} in the upcoming days</Typography>}
                            
                        </Stack>

                        <Tooltip title="On this airport delays are rarely and short">
                            <Stack  className="goodChoiceLike">
                                <ThumbUpAltIcon className="boldBlueText" />
                                <Typography variant="caption" className="boldBlueText">Good choice</Typography>
                                
                            </Stack>
                        </Tooltip>
                </Box>
                <Box className="centeredItemsContent">

                    <Box className="centeredItemsContent">
                            <Typography variant="body2" className="greyText" align="left">
                                The airport has been ranked <span className="greenAccent"> in the top {calculateRanking(statisticsData)}</span> among European airports
                            </Typography>
                    </Box>

                    <Box className="centeredItemsContent">
                        <Typography variant="body2" component="span" className="greyText" align="right">
                            In the event of the most common delay, the estimated time is&nbsp;
                            <span  className="blueAccent">~{calculateDelayTime(statisticsData)} minutes</span>
                        </Typography>
                    </Box>
                        
                </Box>
            </Box>
        </Grid>
    );
};

export default StatisticField;