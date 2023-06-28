import React, { useState, useEffect } from "react";
import {
    Box,
    Container, createTheme,
    CssBaseline,
    Grid, ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Button from "@mui/material/Button";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Airports from "../static/json/Airports.json";
import plane from "../static/images/plane.jpg";

const SearchFlight = () => {
    const [items, setItems] = useState([]);
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [departureAirport, setDepartureAirport] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");

    useEffect(() => {
        const fetchAirports = async () => {
            const airportsNames = Airports.map((item) => item.name);
            setItems(airportsNames);
        };

        fetchAirports();
    }, []);

    const filterOptions = createFilterOptions({
        limit: 100,
        // TODO: Move the most popular Europe airports on to the top of the list
        // TODO: Sort airports by region to filter out non-Europe airports
    });

    const getIcaoCode = (selectedValue) => {
        return Airports.find((item) => item.name === selectedValue).ident;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Arrival airport ICAO:", getIcaoCode(arrivalAirport));
        console.log("Departure airport ICAO:", getIcaoCode(departureAirport));
    };

    const customTheme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1356,
                xl: 1920,
            },
        },
    });

    return (
        <>
            <CssBaseline />
            <main>
                <div>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    backgroundImage: `url(${plane})`,
                                    height: "50vh",
                                    width: "100%",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Container maxWidth="xl">
                                    <Box
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            padding: "1rem",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <form className={"airportData"}>
                                            <Grid
                                                container
                                                spacing={2}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <ThemeProvider theme={customTheme}>
                                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                                    <label>
                                                        <LocalizationProvider
                                                            dateAdapter={AdapterDayjs}
                                                        >
                                                            <DemoContainer components={["DatePicker"]}>
                                                                <DatePicker
                                                                    sx={{ width: "100%" }}
                                                                    label="Departure date"
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </label>
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={2} lg={3}>
                                                    <label>
                                                        <Autocomplete
                                                            id="highlights-demo"
                                                            sx={{ width: "100%" }}
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
                                                                                >
                                          {part.text}
                                        </span>
                                                                            ))}
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }}
                                                        />
                                                    </label>
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                                    <label>
                                                        <LocalizationProvider
                                                            dateAdapter={AdapterDayjs}
                                                        >
                                                            <DemoContainer components={["DatePicker"]}>
                                                                <DatePicker
                                                                    sx={{ width: "100%" }}
                                                                    label="Arrival date"
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </label>
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={2} lg={3}>
                                                    <label>
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
                                                                                >
                                          {part.text}
                                        </span>
                                                                            ))}
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }}
                                                        />
                                                    </label>
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
                                                    >
                                                        Check
                                                    </Button>
                                                </Grid>
                                                </ThemeProvider>
                                            </Grid>
                                        </form>
                                    </Box>
                                </Container>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </>
    );
};

export default SearchFlight;