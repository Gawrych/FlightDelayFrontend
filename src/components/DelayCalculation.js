import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StatisticItem from "./StatisticItem";

const WEATHER_URL = "http://localhost:8080/api/v1/weather/hour";
const STATISTICS_URL = "http://localhost:8080/api/v1/statistics/";

const setColor = (influence) => {
    let color = "black";

    if (influence.toLowerCase() === "low") {
        color = "green"

    } else if (influence.toLowerCase() === "medium") {
        color = "orange"

    } else if (influence.toLowerCase() === "high") {
        color = "red"
    }

    return color;
}

function createWeatherItem (factor, index, icon) {
    const primaryText = <span style={{color: setColor(factor.influence_on_delay) }}> {factor.title} - {factor.influence_on_delay.toLowerCase()} influence</span>;
    const secondaryText = factor.value + " " + factor.unit_name;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

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

        variableRef(data);
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

    if (!arrivalWeatherData || !arrivalStatisticsData || !departureWeatherData || !departureStatisticsData) {
        return;
    }

    return (
        <>
            <CssBaseline />
                <div>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "2rem",
                            borderRadius: "4px",
                            boxShadow: "1",
                        }}
                    >
                        <Container maxWidth="lg">
                            <Grid container spacing={5}>

                                <Grid item container xs={12} sm={12} md={6} lg={6}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Typography variant="h6">Departure airport</Typography>
                                    </Grid>
                                    
                                    <Grid item container xs={12} sm={12} md={12} lg={12} sx={{ alignItems: "center" }}>
                                        {Object.values(departureStatisticsData).map((record, index) => (
                                        
                                            <StatisticItem factor={record} index={index} phase={"DEPARTURE"} />
                                        ))}
                                    </Grid>

                                    <Grid item container xs={12} sm={12} md={12} lg={12} sx={{ alignItems: "center" }}>
                                        {departureWeatherData.map((record, index) => (
                                            <>
                                                {createWeatherItem(record.VISIBILITY, index, <VisibilityIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.CROSSWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.TAILWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.CLOUDBASE, index, <CloudIcon sx={{ color: "#00bbf9" }}/>)}
                                                {createWeatherItem(record.RAIN, index, <WaterDropIcon sx={{ color: "#00bbf9" }}/>)}
                                            </>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid item container xs={12} sm={12} md={6} lg={6}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Typography variant="h6" >Arrival airport</Typography>
                                    </Grid>

                                    <Grid item container xs={12} sm={12} md={12} lg={12} sx={{ alignItems: "center" }}>
                                        {Object.values(arrivalStatisticsData).map((record, index) => (
                                        
                                            <StatisticItem factor={record} index={index} phase={"ARRIVAL"} />
                                        ))}
                                    </Grid>

                                    <Grid item container xs={12} sm={12} md={12} lg={12} sx={{ alignItems: "center" }}>
                                        {arrivalWeatherData.map((record, index) => (
                                            <>
                                                {createWeatherItem(record.VISIBILITY, index, <VisibilityIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.CROSSWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.TAILWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createWeatherItem(record.CLOUDBASE, index, <CloudIcon sx={{ color: "#00bbf9" }}/>)}
                                                {createWeatherItem(record.RAIN, index, <WaterDropIcon sx={{ color: "#00bbf9" }}/>)}
                                            </>
                                        ))}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </div>
        </>
    );
};

export default DelayCalculation;