import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material";
import '../styles/DelayCalculation.css';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StatisticItem from "./StatisticItem";
import WeatherItem from "./WeatherItem";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DelayCard from "./DelayCard";
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
    const [errorHandler, setErrorHandler] = useState("");

    const fetchWeather = async (airport, date, phase, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: getIcaoCode(airport), date: date, phase: phase })
        };

        const response = await fetch(WEATHER_URL, requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setErrorHandler();
            variableRef([data]);

        } else {
            variableRef([]);
            setErrorHandler(data.message);
        }
    };

    const fetchStatistics = async (airport, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
        };

        const response = await fetch(STATISTICS_URL + getIcaoCode(airport), requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setErrorHandler();
            variableRef([data]);

        } else {
            variableRef([]);
            setErrorHandler(data.message);
        }
    };
    
    const fetchNextDaysWeather = async (airport, variableRef) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: getIcaoCode(airport), phase: "ARRIVAL" })
        };

        const response = await fetch(NEXT_WEATHER_URL, requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setErrorHandler();
            variableRef([data]);
            
        } else {
            variableRef([]);
            setErrorHandler(data.message);
        }
    };

    const getIcaoCode = (selectedValue) => {
        return Airports.find((item) => item.name === selectedValue).ident;
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

    return (
        <>
        {errorHandler &&
            <Box
                sx={{
                    width: "100%",
                    backgroundSize: "cover",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "5rem",
                    paddingBottom: "5rem",
                }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h3" sx={{ fontWeight: "600", color: "#4645d8" }}>I am sorry!</Typography>
                            <Typography variant="h6">My calculation encountered a failure.</Typography>
                            <Typography variant="body2">{errorHandler}</Typography>
                        </Grid>
                    </Grid>
            </Box>
        }

        {arrivalWeatherData.length !== 0 && arrivalStatisticsData.length !== 0 && departureWeatherData.length !== 0 && departureStatisticsData.length !== 0 &&
            <Box className="delayCalculationMainBox">
                <CssBaseline>
                    <Container maxWidth="lg">

                            <Grid container sx={{gap: {xs: 5, md: 1}, justifyContent: {xs: "center", md: "space-between"}}} className="delayCardsGrid">
                                <DelayCard  phase={"Departure"} statisticsData={departureStatisticsData} weatherData={departureWeatherData} airportName={flightData.departureAirport} nextDaysWeatherData={departureNextDaysWeatherData}/>
                                <AirplanemodeActiveIcon className="airplaneIcon"/>
                                <DelayCard phase={"Arrival"} statisticsData={arrivalStatisticsData} weatherData={arrivalWeatherData} airportName={flightData.arrivalAirport} nextDaysWeatherData={arrivalNextDaysWeatherData}/>
                            </Grid>

                        <Grid container spacing={5}>

                            <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} className="airportSectionGrid">
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center"}}>{flightData.departureAirport}<FlightTakeoffIcon className="flightIcon"/></Typography>
                                </Grid>
                                
                                <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3} className="centeredItems">

                                    <StatisticItem factor={departureStatisticsData[0].TOP_MONTH_OF_TRAFFIC} index={1} />
                                    <StatisticItem factor={departureStatisticsData[0].AVERAGE_PRE_DEPARTURE_DELAY} index={2} />
                                    <StatisticItem factor={departureStatisticsData[0].TOP_MONTH_DELAY_IN_TAXI_OUT} index={3}  />
                                    <StatisticItem factor={departureStatisticsData[0].AVERAGE_DELAY_IN_TAXI_OUT} index={4}  />
                                    <StatisticItem factor={departureStatisticsData[0].MOST_COMMON_DELAY_CAUSE} index={5}  />
                                    <StatisticItem factor={departureStatisticsData[0].AVERAGE_MONTHLY_TRAFFIC} index={6} short={true}/>
                            

                                    <WeatherItem factor={departureWeatherData[0].VISIBILITY} index={1} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={departureWeatherData[0].CROSSWIND} index={2} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={departureWeatherData[0].TAILWIND} index={3} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={departureWeatherData[0].CLOUDBASE} index={4} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={departureWeatherData[0].RAIN} index={5} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />
                                   
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} sm={12} md={6} lg={6} spacing={3} className="airportSectionGrid">
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6" className="centeredItems">{flightData.arrivalAirport}<FlightLandIcon className="flightIcon" /></Typography>
                                </Grid>
                                
                                <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3} className="centeredItems">

                                    <StatisticItem factor={arrivalStatisticsData[0].TOP_MONTH_OF_TRAFFIC} index={1} />
                                    <StatisticItem factor={arrivalStatisticsData[0].AVERAGE_DELAY_IN_TAXI_IN_AND_ASMA} index={2} />
                                    <StatisticItem factor={arrivalStatisticsData[0].MOST_COMMON_DELAY_CAUSE} index={3} />
                                    <StatisticItem factor={arrivalStatisticsData[0].TOP_MONTH_DELAY_IN_TAXI_IN_AND_ASMA} index={4} />
                                    <StatisticItem factor={arrivalStatisticsData[0].AVERAGE_TIME_TO_PARTICULAR_DELAY_CAUSE} index={5}/>
                                    <StatisticItem factor={arrivalStatisticsData[0].AVERAGE_MONTHLY_TRAFFIC} index={6} short={true}/>

                                    <WeatherItem factor={arrivalWeatherData[0].VISIBILITY} index={1} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={arrivalWeatherData[0].CROSSWIND} index={2} icon={<AirIcon sx={{ color: "#fff" }}/>}/>
                                    <WeatherItem factor={arrivalWeatherData[0].TAILWIND} index={3} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={arrivalWeatherData[0].CLOUDBASE} index={4} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                    <WeatherItem factor={arrivalWeatherData[0].RAIN} index={5} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </CssBaseline>
            </Box>
            }
        </>
    );
};

export default DelayCalculation;