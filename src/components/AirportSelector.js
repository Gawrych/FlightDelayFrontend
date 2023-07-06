import { memo, useState, useEffect } from 'react';
import {Grid} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const filterOptions = createFilterOptions({
    limit: 100,
});

function AirportSelector ({options, setNewAirportForWeather, onAccept, defaultValue}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setNewAirportForWeather(value);
    }, [value]);

    return (
        <Grid item container xs={12} sm={12} md={5} lg={4} sx={{ alignItems: "center", display: 'flex', justifyContent: 'space-between'}}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
                <Button variant="contained" startIcon={<FlightTakeoffIcon />} onClick={onAccept} size="medium"></Button>
            </Grid>

            <Grid item xs={9} sm={9} md={9} lg={9} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Autocomplete
                    sx={{ width: "100%" }}
                    options={options}
                    inputValue={value}
                    onInputChange={(event, value) => setValue(value)}
                    defaultValue={defaultValue}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                        <TextField {...params} label="Airport selector" margin="normal" />
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
    );
    
};

export default memo(AirportSelector);