import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Container, createTheme,
    CssBaseline,
    Grid, ThemeProvider,
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function NextDaysWeather({ nextDaysWeatherRecords }) {

    if (!nextDaysWeatherRecords) {
        return;
    }

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
    
    const parseDate = (dateToParse) => {
        const date = new Date(dateToParse);

        const monthName = getMonthName(date.getMonth());
        const hourWithoutZeroAtStart = dateToParse.slice(-5).replace(/^0+/, '');
        return monthName + " " + date.getDate() + ", " + hourWithoutZeroAtStart;
    }

    const createSummaryRow = (record) => {
        const finalInfluence = setPeriodFactorInfluence(record.factors);

        return (
            <>
                <Typography sx={{ width: '50%', flexShrink: 0 }}>
                    {parseDate(record.from_time)} - {parseDate(record.to_time)}
                </Typography>

                <Typography align="center" sx={{ width: '50%', color: setColor(finalInfluence)}}>

                    {finalInfluence}

                </Typography>
            </>
        );
    }

    const createTableRow = (factor, icon) => {
        const primaryText = <span style={{color: setColor(factor.influence_on_delay) }}> {factor.title} - {factor.influence_on_delay.toLowerCase()} influence</span>;
        const secondaryText = factor.value + " " + factor.unit_name;

        return (
            <>   
                <Grid item xs={12} sm={12} md={3} lg={6}>
                    <List>
                        <ListItem>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={primaryText} secondary={secondaryText} />
                        </ListItem>
                    </List>
                </Grid>
            </>
        );
    }

    return (
        <div>
            <Container maxWidth="xl">

                        <Grid item xs={12} sm={12} md={3} lg={6}>

                            <Typography align="right" variant="body1">
                                Next 7 days weather on airport:
                            </Typography>

                        </Grid>

            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center">

                {nextDaysWeatherRecords.map((record) => (

                <Grid item xs={7} sm={9} md={6} lg={6}>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >

                            {createSummaryRow(record)}

                        </AccordionSummary>

                        <AccordionDetails>

                            <Grid container
                                spacing={2}>

                                {createTableRow(record.factors.VISIBILITY, <VisibilityIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.CROSSWIND, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.TAILWIND, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.CLOUDBASE, <CloudIcon sx={{ color: "#00bbf9" }}/>)}
                                {createTableRow(record.factors.RAIN, <WaterDropIcon sx={{ color: "#00bbf9" }}/>)}

                            </Grid>

                        </AccordionDetails>
                    </Accordion>

                    </Grid>
                ))}

            </Grid>
            </Container>
    </div>
            
    );
}

export default NextDaysWeather;