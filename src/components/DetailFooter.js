import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Container, createTheme,
    CssBaseline,
    Grid, ThemeProvider, Typography,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Button from "@mui/material/Button";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Airports from "../static/json/Airports.json";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import LinearProgress from '@mui/material/LinearProgress';
import Sunny from "../static/images/sunny.png";
import Time from "../static/images/time.png";
import AirportTower from "../static/images/airportTower.png";
import PlaneIcon from "../static/images/planeIcon.png";
import FlightIcon from '@mui/icons-material/Flight';
import CloudIcon from '@mui/icons-material/Cloud';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DetailFooter = () => {

    return (
        <>
                <Box sx={{
                        width: "100%",
                        color: "#fff",
                        backgroundColor: "#4645d8",
                        display: "flex",
                        alignItems: "right",
                        alignContent: "center",
                        justifyContent: "center"}}>
                    <Grid container xs={12} sm={12} md={12} lg={11} sx={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "right",
                                alignContent: "center",
                                justifyContent: "center",}}>

                        <Typography variant="h5">Hello world</Typography>
                    </Grid>
                </Box>
        </>
    );
};

export default DetailFooter;