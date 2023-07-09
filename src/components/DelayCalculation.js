import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material";

import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StatisticItem from "./StatisticItem";
import WeatherItem from "./WeatherItem";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DelayTimeCalculator from "./DelayTimeCalculator";
import StatisticField from "./StatisticField";

const WEATHER_URL = "http://localhost:8080/api/v1/weather/hour";
const STATISTICS_URL = "http://localhost:8080/api/v1/statistics/";

const DelayCalculation = ({ flightData, fetchComplete }) => {

    const [arrivalWeatherData, setArrivalWeatherData] = useState([]);
    const [arrivalStatisticsData, setArrivalStatisticsData] = useState([]);
    const [departureWeatherData, setDepartureWeatherData] = useState([]);
    const [departureStatisticsData, setDepartureStatisticsData] = useState([]);

    const fetchWeather = async (airport, date, phase, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: airport, date: date, phase: phase })
        };

        const data = await fetch(WEATHER_URL, requestOptions).then(response => response.json());

        variableRef([data]);
    };

    const fetchStatistics = async (airport, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
        };

        const data = await fetch(STATISTICS_URL + airport, requestOptions).then(response => response.json());

        variableRef([data]);
    };

    const getArrivalData = () => {
        console.log(flightData.arrivalDate);
        fetchWeather(flightData.arrivalAirport, flightData.arrivalDate, "ARRIVAL", setArrivalWeatherData);
        fetchStatistics(flightData.arrivalAirport, setArrivalStatisticsData);
    };

    const getDepartureData = () => {
        fetchWeather(flightData.departureAirport, flightData.departureDate, "DEPARTURE", setDepartureWeatherData);
        fetchStatistics(flightData.departureAirport, setDepartureStatisticsData);
    };

    useEffect(() => {
        if (flightData !== null) {
            getArrivalData();
            getDepartureData();

            setTimeout(() => {
                fetchComplete(true);
            }, 200);
        }
    }, [flightData]);

    if (arrivalWeatherData.length === 0 || arrivalStatisticsData.length === 0 || departureWeatherData.length === 0 || departureStatisticsData.length === 0) {
        return;
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    backgroundSize: "cover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    boxShadow: "1",
                    paddingTop: "5rem",
                    paddingBottom: "5rem",
                }}>
                <CssBaseline>
                    <Container maxWidth="lg">
                        <Grid container spacing={3} sx={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "7rem"}}>

                            <Grid item xs={12} sm={12} md={12} lg={4} sx={{display: "flex", alignItems: "flex-end", justifyContent: "center",}}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            backgroundSize: "cover",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                        }}>
                                            <Typography variant="h5" sx={{ fontWeight: "600", color: "#4645d7" }}>0.28</Typography>
                                            <Typography variant="body2">Depaprture airport statistic</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            backgroundSize: "cover",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Typography variant="h4" sx={{ fontWeight: "600", color: "#4645d7" }}>Low</Typography>
                                            <Typography variant="body2">The probability of delays</Typography>
                                    </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={2} sx={{display: "flex", alignItems: "flex-end", justifyContent: "center", flexDirection: "column", marginBottom: "1rem"}}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                        color: "#4645d7",
                                        
                                    }}>
                                    <Typography variant="h3" component="span" sx={{ fontWeight: "600" }}> 
                                        5 - <DelayTimeCalculator arrivalStatisticsData={arrivalStatisticsData} departureStatisticsData={departureStatisticsData} /> 
                                    </Typography>
                                    <Typography variant="h5" component="span" sx={{ fontWeight: "600" }}>&nbsp;min</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                    }}>
                                        <Typography variant="body2">The estimated delay time</Typography>

                                    </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} sx={{display: "flex", alignItems: "flex-end", justifyContent: "center",}}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        backgroundSize: "cover",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Typography variant="h4" sx={{ fontWeight: "600", color: "#4645d7" }}>Low</Typography>
                                        <Typography variant="body2">The probability of delays</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        backgroundSize: "cover",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "1rem",
                                        textAlign: "center",
                                    }}>
                                        <Typography variant="h5" sx={{ fontWeight: "600", color: "#4645d7" }}>0.28</Typography>
                                        <Typography variant="body2">Depaprture airport statistic</Typography>
                                </Box>
                            </Grid>

                        </Grid>

                        <StatisticField />

                        <Grid container spacing={5}>

                            <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} sx={{
                                        display: "flex", alignContent: "flex-start"}}>
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center"}}>Departure airport <FlightTakeoffIcon sx={{ marginLeft: "0.5rem", color: "#4645d8" }} /></Typography>
                                </Grid>
                                
                                <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3}
                                    sx={{ display: "flex", alignItems: "center"}}>


                                    {departureStatisticsData.map((record) => (
                                        <>
                                            <StatisticItem factor={record.TOP_MONTH_OF_TRAFFIC} index={1} />
                                            <StatisticItem factor={record.AVERAGE_PRE_DEPARTURE_DELAY} index={2} />
                                            <StatisticItem factor={record.TOP_MONTH_DELAY_IN_TAXI_OUT} index={3} />
                                            <StatisticItem factor={record.AVERAGE_DELAY_IN_TAXI_OUT} index={4} />
                                            <StatisticItem factor={record.MOST_COMMON_DELAY_CAUSE} index={5} />
                                            <StatisticItem factor={record.AVERAGE_MONTHLY_TRAFFIC} index={6} short={true}/>
                                        </>
                                    ))}

                                    {departureWeatherData.map((record) => (
                                        <>
                                            <WeatherItem factor={record.VISIBILITY} index={1} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.CROSSWIND} index={2} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.TAILWIND} index={3} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.CLOUDBASE} index={4} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.RAIN} index={5} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />
                                        </>
                                    ))}
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} sx={{ 
                                        display: "flex", alignContent: "flex-start"}}>
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center"}}>Arrival airport <FlightLandIcon sx={{ marginLeft: "0.5rem", color: "#4645d8" }} /></Typography>
                                </Grid>
                                
                                <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3} 
                                    sx={{ display: "flex", alignItems: "center"}}>

                                    {arrivalStatisticsData.map((record, index) => (
                                        <>
                                            <StatisticItem factor={record.TOP_MONTH_OF_TRAFFIC} index={1} />
                                            <StatisticItem factor={record.AVERAGE_DELAY_IN_TAXI_IN_AND_ASMA} index={2} />
                                            <StatisticItem factor={record.MOST_COMMON_DELAY_CAUSE} index={3} />
                                            <StatisticItem factor={record.TOP_MONTH_DELAY_IN_TAXI_IN_AND_ASMA} index={4} />
                                            <StatisticItem factor={record.AVERAGE_TIME_TO_PARTICULAR_DELAY_CAUSE} index={5} />
                                            <StatisticItem factor={record.AVERAGE_MONTHLY_TRAFFIC} index={6} short={true}/>
                                        </>
                                    ))}

                                                                        
                                    {arrivalWeatherData.map((record) => (
                                        <>
                                            <WeatherItem factor={record.VISIBILITY} index={1} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.CROSSWIND} index={2} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.TAILWIND} index={3} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.CLOUDBASE} index={4} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                            <WeatherItem factor={record.RAIN} index={5} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />
                                        </>
                                    ))}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </CssBaseline>
            </Box>
        </>
    );
};

export default DelayCalculation;