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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Stack from '@mui/material/Stack';
import AirportSelector from "./AirportSelector";
import WeatherGrid from "./WeatherGrid";

const NEXT_WEATHER_URL = "http://localhost:8080/api/v1/weather/periods?days=5";

function NextDaysWeather() {
    const [items, setItems] = useState([]);
    const [nextDaysWeatherRecords, setNextDaysWeatherRecords] = useState(null);
    const [nextDayWeatherAirportIcao, setNextDayWeatherAirportIcao] = useState("EPWA");
    const [nextDayWeatherAirport, setNextDayWeatherAirport] = useState("");
    const [loading, setLoading] = useState(false);

    const setNewAirportForWeather = useCallback(val => {
        setNextDayWeatherAirport(val);
        console.log("In main", val);
        console.log("In main", nextDayWeatherAirport);
    });
    
    const fetchNextDaysWeather = useCallback(async () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: nextDayWeatherAirportIcao, phase: "ARRIVAL" })
        };

        const data = await fetch(NEXT_WEATHER_URL, requestOptions)
            .then(response => response.json());

        setNextDaysWeatherRecords(data);
        setLoading(false);
      }, [nextDayWeatherAirportIcao]);

    useEffect(() => {
        const fetchAirports = async () => {
            const airportsNames = Airports.map((item) => item.name);
            setItems(airportsNames);
        };

        fetchAirports();
        fetchNextDaysWeather();
    }, []);

    useEffect(() => {
        fetchNextDaysWeather();
    }, [nextDayWeatherAirportIcao]);

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

    if (!nextDaysWeatherRecords) {
        return;
    }

    return (
        <>
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
                                    <InfoOutlinedIcon />
                                </Stack>
                            </Grid>

                            <AirportSelector options={items} setNewAirportForWeather={setNewAirportForWeather} onAccept={sendForNewData} defaultValue={items[0]} />

                        </Grid>
                    </Box>
                    <Box key={"weatherForecast"}>
                        <ThemeProvider theme={theme}>
                            <WeatherGrid recordChangeHandle={recordChangeHandle} />
                        </ThemeProvider>
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default NextDaysWeather;