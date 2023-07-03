import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Airports from "../static/json/Airports.json";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';

const NEXT_WEATHER_URL = "http://localhost:8080/api/v1/weather/periods?days=5";

function NextDaysWeather({}) {
    const [items, setItems] = useState([]);
    const [nextDaysWeatherRecords, setNextDaysWeatherRecords] = useState(null);
    const [nextDayWeatherAirportIcao, setNextDayWeatherAirportIcao] = useState("EPWA");
    const [nextDayWeatherAirport, setNextDayWeatherAirport] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchNextDaysWeather = async () => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept-Language': 'en-EN' },
            body: JSON.stringify({ airportIdent: nextDayWeatherAirportIcao, phase: "ARRIVAL" })
        };

        const data = await fetch(NEXT_WEATHER_URL, requestOptions)
            .then(response => response.json());

        setNextDaysWeatherRecords(data);
        setLoading(false);
        console.log(nextDaysWeatherRecords);
    };

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

    if (!nextDaysWeatherRecords) {
        return;
    }

    const getIcaoCode = (selectedValue) => {
        return Airports.find((item) => item.name === selectedValue).ident;
    };

    const sendForNewData = () => {
        if (nextDayWeatherAirport === "") {
            return;
        }

        const airportIcao = getIcaoCode(nextDayWeatherAirport);

        if (airportIcao != nextDayWeatherAirportIcao) {
            setLoading(true);
        }

        setNextDayWeatherAirportIcao(airportIcao);
    };

    const filterOptions = createFilterOptions({
        limit: 100,
    });

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
    }

    const setPeriodFactorInfluence = (factorsObject) => {
        let periodInfluence = "LOW";

        Object.values(factorsObject).map((factor) => {

            if (factor.influence_on_delay === "MEDIUM") {
                periodInfluence = "MEDIUM";

            } else if (factor.influence_on_delay === "HIGH") {
                periodInfluence = "HIGH";
                return;
            }
        });

        return capitalizeFirstLowercaseRest(periodInfluence);
    }

    const capitalizeFirstLowercaseRest = (str) => {
        return (
          str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        );
      };

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

    const setPreSetColor = (influence) => {
        let color = "success";

        if (influence.toLowerCase() === "low") {
            color = "success"

        } else if (influence.toLowerCase() === "medium") {
            color = "warning"

        } else if (influence.toLowerCase() === "high") {
            color = "error"
        }

        return color;
    }
    
    const parseDate = (dateToParse) => {
        const date = new Date(dateToParse);

        const monthName = getMonthName(date.getMonth());
        let hourWithoutZeroAtStart = dateToParse.slice(-5).replace(/^0+/, '');
        if (hourWithoutZeroAtStart.length === 3) {
            hourWithoutZeroAtStart = "00" + hourWithoutZeroAtStart;
        }
        return monthName + " " + date.getDate() + ", " + hourWithoutZeroAtStart;
    }

    const theme = createTheme({
        palette: {
          lowInfluence: {
            main: '#fff',
            contrastText: '#000',
          },
        },
      });

    const createSummaryRow = (record) => {
        const finalInfluence = setPeriodFactorInfluence(record.factors);

        return (
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '50%', flexShrink: 0 }}>
                    {parseDate(record.from_time)} - {parseDate(record.to_time)}
                </Typography>

                <Typography align="center" sx={{ width: '50%', color: setColor(finalInfluence)}}>

                <Chip label={finalInfluence} color={setPreSetColor(finalInfluence)} />

                </Typography>
            </AccordionSummary>
        );
    }

    const createTableRow = (factor, index, icon) => {
        const primaryText = <span style={{color: setColor(factor.influence_on_delay) }}> {factor.title} - {factor.influence_on_delay.toLowerCase()} influence</span>;
        const secondaryText = factor.value + " " + factor.unit_name;

        return (
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <List>
                    <ListItem key={index}>
                            <ListItemIcon> {icon} </ListItemIcon>
                            <ListItemText primary={primaryText} secondary={secondaryText} />
                    </ListItem>
                </List>
            </Grid>
        );
    }

    return (
        <>
        <div>
            <Container maxWidth="lg">

                <Box sx={{ width: '100%' }}>
                    {loading && <LinearProgress />}
                </Box>

                <Box>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ padding: 5 }}>
                            <Typography align="left" variant="h6">
                                The next days weather on nearest airport
                            </Typography>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={6} lg={6} sx={{ alignItems: "center", justifyContent: 'flex-end' }}>
                            <Grid item xs={12} sm={12} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: "10px", padding: 2}}>
                                <Button variant="contained" startIcon={<FlightTakeoffIcon />} onClick={sendForNewData} size="medium"></Button>
                            </Grid>

                            <Grid item xs={12} sm={12} md={10} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                <Autocomplete
                                sx={{ width: "100%" }}
                                options={items}
                                inputValue={nextDayWeatherAirport}
                                onInputChange={(event, value) => setNextDayWeatherAirport(value)}
                                defaultValue={items[0]}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                    <TextField {...params} label="Nearest airport" margin="normal" />
                                )}
                                renderOption={(props, option, { inputValue }) => {
                                    const matches = match(option, inputValue, { insideWords: true });
                                    const parts = parse(option, matches);

                                    return (
                                    <li {...props}>
                                        <div>
                                        {parts.map((part, index) => (
                                            <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
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
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <ThemeProvider theme={theme}>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            alignItems="top">

                            {nextDaysWeatherRecords.map((record, index) => (

                                <Grid item xs={12} sm={12} md={6} lg={6} >

                                    <Accordion>
                                        
                                        {createSummaryRow(record)}

                                        <AccordionDetails>

                                            <Grid container
                                                spacing={2}>

                                                {createTableRow(record.factors.VISIBILITY, index, <VisibilityIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createTableRow(record.factors.CROSSWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createTableRow(record.factors.TAILWIND, index, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                                {createTableRow(record.factors.CLOUDBASE, index, <CloudIcon sx={{ color: "#00bbf9" }}/>)}
                                                {createTableRow(record.factors.RAIN, index, <WaterDropIcon sx={{ color: "#00bbf9" }}/>)}

                                            </Grid>

                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}
                        </Grid>
                    </ThemeProvider>
                </Box>
            </Container>
    </div>
    </>     
    );
}

export default NextDaysWeather;