import React, { useState, useEffect, moment, now, then } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
    Stack,
} from "@mui/material";

import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StatisticItem from "./StatisticItem";
import WeatherItem from "./WeatherItem";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import StatisticField from "./StatisticField";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Airports from "../static/json/Airports.json";


const WEATHER_URL = "http://localhost:8080/api/v1/weather/hour";
const STATISTICS_URL = "http://localhost:8080/api/v1/statistics/";
const NEXT_WEATHER_URL = "http://localhost:8080/api/v1/weather/periods?days=5";

const DelayCalculation = ({ flightData, fetchComplete }) => {

    const [arrivalWeatherData, setArrivalWeatherData] = useState([]);
    const [arrivalNextDaysWeatherData, setArrivalNextDaysWeatherData] = useState([]);
    const [arrivalStatisticsData, setArrivalStatisticsData] = useState([]);
    const [departureWeatherData, setDepartureWeatherData] = useState([]);
    const [departureNextDaysWeatherData, setDepartureNextDaysWeatherData] = useState([]);
    const [departureStatisticsData, setDepartureStatisticsData] = useState([]);

    const getIcaoCode = (selectedValue) => {
        return Airports.find((item) => item.name === selectedValue).ident;
    };

    const fetchWeather = async (airport, date, phase, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: getIcaoCode(airport), date: date, phase: phase })
        };

        const data = await fetch(WEATHER_URL, requestOptions).then(response => response.json());

        variableRef([data]);
    };

    const fetchStatistics = async (airport, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
        };

        const data = await fetch(STATISTICS_URL + getIcaoCode(airport), requestOptions).then(response => response.json());

        variableRef([data]);
    };
    
    const fetchNextDaysWeather = async (airport, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: getIcaoCode(airport), phase: "ARRIVAL" })
        };

        const data = await fetch(NEXT_WEATHER_URL, requestOptions).then(response => response.json());

        variableRef([data]);
    };


    const getArrivalData = () => {
        fetchWeather(flightData.arrivalAirport, flightData.arrivalDate, "ARRIVAL", setArrivalWeatherData);
        fetchStatistics(flightData.arrivalAirport, setArrivalStatisticsData);
    };

    const getDepartureData = () => {
        fetchWeather(flightData.departureAirport, flightData.departureDate, "DEPARTURE", setDepartureWeatherData);
        fetchStatistics(flightData.departureAirport, setDepartureStatisticsData);
    };

    const getDepartureNextDaysWeatherData = () => {
        fetchNextDaysWeather(flightData.departureAirport, setDepartureNextDaysWeatherData);
    };

    const getArrivalNextDaysWeatherData = () => {
        fetchNextDaysWeather(flightData.arrivalAirport, setArrivalNextDaysWeatherData);
    };

    useEffect(() => {
        if (flightData !== null) {
            getArrivalData();
            getDepartureData();
            getDepartureNextDaysWeatherData();
            getArrivalNextDaysWeatherData();

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

                            <Grid container sx={{gap: {xs: 5, md: 1}, display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "space-between"}, marginBottom: "7rem", marginTop: "2rem",}}>
                                <StatisticField  phase={"Departure"} statisticsData={departureStatisticsData} weatherData={departureWeatherData} airportName={flightData.departureAirport} nextDaysWeatherData={departureNextDaysWeatherData}/>
                                <AirplanemodeActiveIcon sx={{ fontSize: "2.5rem", color: "#4645d8", transform: {xs: "rotate(180deg)", md: "rotate(90deg)"}, }} />
                                <StatisticField phase={"Arrival"} statisticsData={arrivalStatisticsData} weatherData={arrivalWeatherData} airportName={flightData.arrivalAirport} nextDaysWeatherData={arrivalNextDaysWeatherData}/>
                            </Grid>

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