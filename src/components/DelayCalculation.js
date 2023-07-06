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
            <CssBaseline>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>

                        <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} sx={{ 
                                    display: "flex", alignContent: "flex-start"}}>
                            <Grid item container xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h6" >Departure airport</Typography>
                            </Grid>
                            
                            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3}
                                sx={{ display: "flex", alignItems: "center"}}>

                                {departureWeatherData.map((record, index) => (
                                    <>
                                        <WeatherItem factor={record.VISIBILITY} index={1} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.CROSSWIND} index={2} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.TAILWIND} index={3} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.CLOUDBASE} index={4} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.RAIN} index={5} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />
                                    </>
                                ))}

                                {departureStatisticsData.map((record, index) => (
                                    <>
                                        <StatisticItem factor={record.AVERAGE_MONTHLY_TRAFFIC} index={1} short={true}/>
                                        <StatisticItem factor={record.TOP_MONTH_OF_TRAFFIC} index={2} />
                                        <StatisticItem factor={record.AVERAGE_PRE_DEPARTURE_DELAY} index={3} />
                                        <StatisticItem factor={record.TOP_MONTH_DELAY_IN_TAXI_OUT} index={4} />
                                        <StatisticItem factor={record.AVERAGE_DELAY_IN_TAXI_OUT} index={5} />
                                        <StatisticItem factor={record.TOP_MONTH_OF_PRE_DEPARTURE_DELAY} index={6} />
                                    </>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} sx={{ 
                                    display: "flex", alignContent: "flex-start"}}>
                            <Grid item container xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h6">Arrival airport</Typography>
                            </Grid>
                            
                            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3} 
                                sx={{ display: "flex", alignItems: "center"}}>

                                
                                {arrivalWeatherData.map((record, index) => (
                                    <>
                                        <WeatherItem factor={record.VISIBILITY} index={index} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.CROSSWIND} index={index} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.TAILWIND} index={index} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.CLOUDBASE} index={index} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                        <WeatherItem factor={record.RAIN} index={index} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />
                                    </>
                                ))}

                                {arrivalStatisticsData.map((record, index) => (
                                    <>
                                        <StatisticItem factor={record.AVERAGE_MONTHLY_TRAFFIC} index={1} short={true}/>
                                        <StatisticItem factor={record.TOP_MONTH_OF_TRAFFIC} index={2} />
                                        <StatisticItem factor={record.AVERAGE_DELAY_IN_TAXI_IN_AND_ASMA} index={3} />
                                        <StatisticItem factor={record.MOST_COMMON_DELAY_CAUSE} index={4} />
                                        <StatisticItem factor={record.TOP_MONTH_DELAY_IN_TAXI_IN_AND_ASMA} index={5} />
                                        <StatisticItem factor={record.AVERAGE_TIME_TO_PARTICULAR_DELAY_CAUSE} index={6} />
                                    </>
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </CssBaseline>
        </>
    );
};

export default DelayCalculation;