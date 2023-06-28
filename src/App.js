import { useState, useEffect } from "react";
import React from 'react';
import Airports from "./Airports";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";


function App() {
    const [items, setItems] = useState([]);
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');

    useEffect(() => {
        const fetchAirports = async () => {
            const airportsNames = Airports.map(item => item.name);
            setItems(airportsNames);
        };

        fetchAirports();
    }, []);

    const filterOptions = createFilterOptions({
        limit: 100,
        // TODO: Move the most popular europe airports on to top of the list
        // TODO: Sort airports by region to filter out not europe airports
    });

    const getIcaoCode = (selectedValue) => {
        return Airports.find(item => item.name === selectedValue).ident;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Arrival airport ICAO:", getIcaoCode(arrivalAirport));
        console.log("Departure airport ICAO:", getIcaoCode(departureAirport));
    };

    return (
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <form className={'airportData'}>
                <label>
                    Departure Date:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Departure date" />
                        </DemoContainer>
                    </LocalizationProvider>
                </label>

                <label>
                    Departure Airport:
                    <Autocomplete
                        id="highlights-demo"
                        sx={{ width: 300 }}
                        options={items}
                        inputValue={departureAirport}
                        onInputChange={(event, value) => setDepartureAirport(value)}
                        filterOptions={filterOptions}
                        renderInput={(params) => (
                            <TextField {...params} label="Departure airport" margin="normal" />
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
                                                }}> {part.text}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            );
                        }}
                    />
                </label>

                <label>
                    Arrival Date:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Arrival date" />
                        </DemoContainer>
                    </LocalizationProvider>
                </label>

                <label>
                    Arrival Airport:
                    <Autocomplete
                        id="highlights-demo"
                        sx={{ width: 300 }}
                        options={items}
                        inputValue={arrivalAirport}
                        onInputChange={(event, value) => setArrivalAirport(value)}
                        filterOptions={filterOptions}
                        renderInput={(params) => (
                            <TextField {...params} label="Arrival airport" margin="normal" />
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
                                                }}> {part.text}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            );
                        }}
                    />
                </label>
                <Button className={'submitButton'} onClick={handleSubmit}>Primary</Button>
            </form>
        </Stack>
    );
}

export default App;