import React, { useState, useEffect, moment } from "react";
import {
    Box,
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

const SearchFlight = ({ onFlightData, loadingStatus}) => {
    const [items, setItems] = useState([]);
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [departureAirport, setDepartureAirport] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [warning, setWarning] = useState(false);
    const [warningText, setWarningText] = useState("");

    useEffect(() => {
        const fetchAirports = async () => {
            const airportsNames = Airports.map((item) => item.name);
            setItems(airportsNames);
        };

        fetchAirports();
    }, []);

    const filterOptions = createFilterOptions({
        limit: 100,
    });

    const check = (newDate, setDateFieldFunction) => {
        const dateInDate = new Date(newDate);
        const year = dateInDate.getFullYear();
        const month = ("0" + (dateInDate.getMonth() + 1)).slice(-2)
        const day = ("0" + dateInDate.getDate()).slice(-2)
        const hours = ("0" + dateInDate.getHours()).slice(-2);

        setDateFieldFunction(year + "-" + month + "-" + day + "T" + hours + ":00");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 16)

        if (arrivalAirport === "" || departureAirport === "") {
            setWarning(true);
            setWarningText("Please select both airports and dates");
            return;
        }

        if (arrivalAirport === departureAirport) {
            setWarning(true);
            setWarningText("Please select different airports");
            return;
        }

        if (arrivalDate === departureDate) {
            setWarning(true);
            setWarningText("Please select an arrival date that is after the departure date");
            return;
        }

        if (departureDate > arrivalDate) {
            setWarning(true);
            setWarningText("Please select an arrival date that is after the departure date");
            return;
        }

        if (new Date(departureDate) > todayDate || new Date(arrivalDate) > todayDate) {
            setWarning(true);
            setWarningText("Please select a dates that are within the next 15 days from today");
            return;
        }

        setWarning(false);

        const flightData = {
            arrivalAirport: arrivalAirport,
            departureAirport: departureAirport,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
        };

        onFlightData(flightData);
    };

    const customTheme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1372,
                xl: 1920,
            },
        },
    });

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: "1",
                    }}>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            alignItems="center">

                            <ThemeProvider theme={customTheme}>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DemoContainer components={["DatePicker"]}>
                                            <DateTimePicker
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                }}
                                                onChange={(date) => check(date, setDepartureDate)}
                                                disablePast={true}
                                                sx={{ 
                                                    width: "100%",
                                                    borderRadius: "0.3rem",
                                                    borderBottomWidth: "1.5px",
                                                    borderBottomColor: "#2969EA",
                                                    borderBottomStyle: "solid", }}
                                                label="Departure date"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                            </Grid>

                            <Grid item xs={12} sm={6} md={2} lg={3}>

                                    <Autocomplete
                                        id="highlights-demo"
                                        sx={{ 
                                            width: "100%",
                                             }}
                                        options={items}
                                        inputValue={departureAirport}
                                        onInputChange={(event, value) =>
                                            setDepartureAirport(value)
                                        }
                                        filterOptions={filterOptions}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Departure airport"
                                                margin="normal"
                                                sx={{
                                                    borderRadius: "0.3rem",
                                                    borderBottomWidth: "1.5px",
                                                    borderBottomColor: "#2969EA",
                                                    borderBottomStyle: "solid", }}
                                            />
                                        )}
                                        renderOption={(
                                            props,
                                            option,
                                            { inputValue }
                                        ) => {
                                            const matches = match(
                                                option,
                                                inputValue,
                                                {
                                                    insideWords: true,
                                                }
                                            );
                                            const parts = parse(option, matches);

                                            return (
                                                <li {...props}>
                                                    <div>
                                                        {parts.map((part, index) => (
                                                            <span
                                                                key={index}
                                                                style={{
                                                                    fontWeight: part.highlight? 700 : 400,
                                                                }}
                                                            >
                        {part.text}
                    </span>
                                                        ))}
                                                    </div>
                                                </li>
                                            );
                                        }}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={2}>

                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DemoContainer components={["DatePicker"]}>
                                            <DateTimePicker
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                }}
                                                onChange={(date) => check(date, setArrivalDate)}
                                                disablePast={true}
                                                sx={{ 
                                                    width: "100%",
                                                    borderRadius: "0.3rem",
                                                    borderBottomWidth: "1.5px",
                                                    borderBottomColor: "#2969EA",
                                                    borderBottomStyle: "solid", }}
                                                label="Arrival date"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                            </Grid>

                            <Grid item xs={12} sm={6} md={2} lg={3}>

                                    <Autocomplete
                                        id="highlights-demo"
                                        sx={{ width: "100%" }}
                                        options={items}
                                        inputValue={arrivalAirport}
                                        onInputChange={(event, value) =>
                                            setArrivalAirport(value)
                                        }
                                        filterOptions={filterOptions}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Arrival airport"
                                                margin="normal"
                                                sx={{
                                                    borderRadius: "0.3rem",
                                                    borderBottomWidth: "1.5px",
                                                    borderBottomColor: "#2969EA",
                                                    borderBottomStyle: "solid", }}
                                            />
                                        )}
                                        renderOption={(
                                            props,
                                            option,
                                            { inputValue }
                                        ) => {
                                            const matches = match(
                                                option,
                                                inputValue,
                                                {
                                                    insideWords: true,
                                                }
                                            );
                                            const parts = parse(option, matches);

                                            return (
                                                <li {...props}>
                                                    <div>
                                                        {parts.map((part, index) => (
                                                            <span
                                                                key={index}
                                                                style={{
                                                                    fontWeight: part.highlight
                                                                        ? 700
                                                                        : 400,
                                                                }}
                                                            > {part.text}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </li>
                                            );
                                        }}
                                    />

                            </Grid>
                            <Grid item xs={12} md={12} lg={2} sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Button
                                    variant="contained"
                                    startIcon={<FlightTakeoffIcon />}
                                    size="large"
                                    onClick={handleSubmit}
                                    sx={{ backgroundColor: "#4645d7", '&:hover': { backgroundColor: '#fff',color: '#3c52b2'}, }}
                                >
                                    Check
                                </Button>
                            </Grid>
                            </ThemeProvider>
                        </Grid>

                        {warning && <Typography variant="body1"><span style={{ color: "red" }}>{warningText}</span></Typography>}
                </Box>
                <Box sx={{ width: '100%' }}>
                    {loadingStatus && <LinearProgress sx={{backgroundColor: "#fff"}} />}
                </Box>
            </Container>
        </>
    );
};

export default SearchFlight;