import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
    Stack,
    Chip,
} from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StatisticItem from "./StatisticItem";
import WeatherItem from "./WeatherItem";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DelayTimeCalculator from "./DelayTimeCalculator";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StatisticField = ({  }) => {

    return (
        <Grid item xs={12} sm={6} md={6} lg={2}>
            <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}>
                        <Stack direction="row" gap={1} sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                            <FlightTakeoffIcon sx={{ color: "#4645d7" }} />
                            <Typography variant="h6">Delay chance on Warsaw Chopin Airport</Typography>
                            
                        </Stack>

                        <InfoOutlinedIcon />
                </Box>
                <Box
                gap={2}
                    sx={{
                        width: "100%",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        marginTop: "2rem",
                    }}>
                
                    <Typography variant="h4" sx={{ fontWeight: "600", color: "#4645d7" }}>15%</Typography>
                    <Chip label={<Typography variant="body2" sx={{ fontWeight: "600", color: "#e69241"}}>+25%</Typography>} sx={{backgroundColor: "#fff0e1"}} />
                    <Typography variant="body2" sx={{ fontWeight: "600", color: "#b9b8bd" }}>caused by weather in last 3 days</Typography>
                    
                </Box>
                <Box
                gap={2}
                    sx={{
                        width: "100%",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        marginTop: "2rem",
                    }}>
                        <Chip label={<Typography variant="body2" sx={{ fontWeight: "600", color: "#fff"}}>~10 min</Typography>} sx={{backgroundColor: "#4645d7"}} />

                        <Typography variant="body2" sx={{ fontWeight: "600", color: "#b9b8bd" }}>estimated time if the most common delay occur</Typography>
                </Box>
            </Box>
        </Grid>
    );
};

export default StatisticField;