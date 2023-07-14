import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Container,
    Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Airports from "../static/json/Airports.json";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import AirportSelector from "./AirportSelector";
import WeatherGrid from "./WeatherGrid";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const NEXT_WEATHER_URL = "https://flightdelay-2a258086bffe.herokuapp.com/api/v1/weather/periods?days=5";

function NextDaysWeather() {
    const [items, setItems] = useState([]);
    const [nextDaysWeatherRecords, setNextDaysWeatherRecords] = useState(null);
    const [nextDayWeatherAirportIcao, setNextDayWeatherAirportIcao] = useState("");
    const [nextDayWeatherAirport, setNextDayWeatherAirport] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorHandler, setErrorHandler] = useState("");


    const setNewAirportForWeather = useCallback(val => {
        setNextDayWeatherAirport(val);
    });
    
    const fetchNextDaysWeather = useCallback(async () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: nextDayWeatherAirportIcao, phase: "ARRIVAL" })
        };

        const response = await fetch(NEXT_WEATHER_URL, requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setErrorHandler();
            setNextDaysWeatherRecords(data);
            
        } else {
            setNextDaysWeatherRecords();
            setErrorHandler(data.message);
        }

        setLoading(false);
    }, [nextDayWeatherAirportIcao]);

    useEffect(() => {
        if (nextDayWeatherAirportIcao !== "") {
            fetchNextDaysWeather();
        }
    }, [nextDayWeatherAirportIcao]);
      
    useEffect(() => {
        const fetchAirports = async () => {
            const airportsNames = Airports.map((item) => item.name);
            setItems(airportsNames);
        };

        fetchAirports();
        setNextDayWeatherAirportIcao("EPWA");
    }, []);

    const getIcaoCode = (selectedValue) => {
        return Airports.find((item) => item.name === selectedValue).ident;
    };

    const sendForNewData = () => {
        if (nextDayWeatherAirport === "") {
            return;
        }

        const airportIcao = getIcaoCode(nextDayWeatherAirport);

        if (airportIcao !== nextDayWeatherAirportIcao) {
            setLoading(true);
        }

        setNextDayWeatherAirportIcao(airportIcao);
    };

    const recordChangeHandle = useCallback(() => {
        return nextDaysWeatherRecords;
    }, [nextDaysWeatherRecords]);


    const theme = createTheme({
        palette: {
          neutral: {
            success: "#28AF5F",
            warning: '#e69241',
            error: '#ee786b',
          }
        }
    });

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

            {nextDaysWeatherRecords &&
                <Container maxWidth="lg">

                    <Box sx={{ width: '100%' }}>
                        {loading && <LinearProgress />}
                    </Box>

                    <Stack direction="column" gap={2} sx={{ display: "flex", flex: "1" }}>
                        <Box>
                            <Grid container justifyContent="center" sx={{ display: 'flex', alignItems: 'center' }}>

                                <Grid item container xs={12} sm={12} md={7} lg={8} sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Typography variant="h5">Airport weather forecast</Typography>
                                        <CloudQueueIcon sx={{color: "#4645d8" }}/>
                                    </Stack>
                                </Grid>

                                <AirportSelector options={items} setNewAirportForWeather={setNewAirportForWeather} onAccept={sendForNewData} defaultValue={items[0]} />

                            </Grid>
                        </Box>
                        <Box>
                            <ThemeProvider theme={theme}>
                                <WeatherGrid recordChangeHandle={recordChangeHandle} />
                            </ThemeProvider>
                        </Box>
                    </Stack>
                </Container>
            }
        </>
    );
}

export default NextDaysWeather;