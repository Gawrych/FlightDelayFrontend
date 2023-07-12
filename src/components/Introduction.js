import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    createTheme,
    Grid, ThemeProvider, Typography,
} from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Introduction = () => {

    const customTheme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1452,
                xl: 1920,
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={customTheme}>
                <Box sx={{
                        width: "100%",
                        color: "#fff",
                        margin: "1rem",
                        display: "flex",
                        alignItems: "right",
                        alignContent: "center",
                        justifyContent: "center"}}>
                    <Grid container item xs={12} sm={12} md={12} lg={11} sx={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "right",
                                alignContent: "center",
                                justifyContent: "center",}}>

                        <Grid item container xs={12} sm={12} md={12} lg={4}>
                            <Stack direction="column" gap={2} sx={{
                                padding: "1rem",
                                fontWeight: "700",}}>
                                <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} sx={{
                                    padding: "1rem",
                                    fontWeight: "700",
                                    textAlign: "left",
                                    display: "flex",
                                    alignContent: "flex-start",
                                    alignItems: "center",
                                    justifyContent: "flex-start",}}>

                                    <Grid item xs={12} sm={12} md={6} lg={10}>
                                        
                                        <Typography variant="h3">Airport weather forecast <CloudIcon sx={{fontSize: 40}} /></Typography>
                                    
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={10}>
                                        
                                        <Typography variant="h6">you can check the weather at your chosen airport and receive forecasted conditions to determine if they are within the limits for a timely arrival, on chosen date or for the upcoming five days.</Typography>
                                        
                                    </Grid>
                                </Grid>

                            </Stack>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={12} lg={4}>
                            <Stack direction="column" gap={2} sx={{
                                padding: "1rem",
                                fontWeight: "700",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "right",
                                alignContent: "center",
                                justifyContent: "center",}}>
                                        
                                <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} sx={{
                                    padding: "1rem",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    display: "flex",
                                    alignContent: "flex-start",
                                    alignItems: "center",
                                    justifyContent: "center",}}>
                                
                                    <Grid item xs={12} sm={12} md={6} lg={10}>
                                        
                                        <Typography variant="h3">Delay probability <br /> <AccessTimeIcon sx={{fontSize: 30}} /> calculator <AccessTimeIcon sx={{fontSize: 30}} /> </Typography>
                                    
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={10}>
                                        
                                        <Typography variant="h6">you can input the specific date, time, and airport for your flight, and algorithms analyze historical airport statistics and current weather conditions to generate a probability of delay for your chosen time and location. This enables you to make more informed decisions about your travel plans.</Typography>
                                        
                                    </Grid>

                                </Grid>

                            </Stack>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={12} lg={4} >
                            <Stack direction="column" gap={2} sx={{
                                padding: "1rem",
                                fontWeight: "700",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "right",
                                alignContent: "center",
                                justifyContent: "center",}}>
                                <Grid item container xs={12} sm={12} md={12} lg={12} direction="row-reverse">
                            
                                    <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} sx={{
                                        padding: "1rem",
                                        fontWeight: "700",
                                        textAlign: "right",
                                        display: "flex",
                                        alignItems: "center",
                                        alignContent: "flex-start",
                                        justifyContent: "flex-end",}}>
                                    
                                        <Grid item xs={12} sm={12} md={6} lg={10}>
                                            
                                            <Typography variant="h3">Airport statistic <br /> <LeaderboardIcon sx={{fontSize: 30}} /> data</Typography>
                                        
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={10}>
                                            
                                            <Typography variant="h6">you can effortlessly check airport statistics and obtain the most important information needed to ensure punctuality and enables you to make more informed decisions about choice of airport.</Typography>

                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
        </ThemeProvider>
        </>
    );
};

export default Introduction;