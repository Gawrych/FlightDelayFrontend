import React, { useState, useEffect } from "react";
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


function NextDaysWeather({ nextDaysWeatherRecords }) {

    if (!nextDaysWeatherRecords) {
        return;
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

    const createSummaryRow = (record) => {
        const finalInfluence = setPeriodFactorInfluence(record.factors);
        return (
            <>
                <Typography sx={{ width: '50%', flexShrink: 0 }}>
                    {record.from_time.replace("T", " ")} - {record.to_time.replace("T", " ")}
                </Typography>

                <Typography align="center" sx={{ width: '50%', color: setColor(finalInfluence)}}>

                    {finalInfluence}

                </Typography>
            </>
        );
    }

    const createTableRow = (factor) => {
        return (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    
                    <TableCell component="th" scope="row">
                        {factor.title}
                    </TableCell>

                    <TableCell align="right" component="th" scope="row">
                        {factor.value}
                    </TableCell>

                    <TableCell align="right" component="th" scope="row">
                        {factor.unit_name}
                    </TableCell>

                    <TableCell align="right" component="th" scope="row" sx={{ color: setColor(factor.influence_on_delay)}}>
                        {factor.influence_on_delay}
                    </TableCell>
            </TableRow>);
    }

    return (
        <div>
            <Container maxWidth="xl">

                    <Grid container
                                        spacing={2}
                                        justifyContent="center"
                                        alignItems="center">
                            
                            <Grid item xs={12} sm={12} md={3} lg={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Visibility - LOW" secondary="24140 meters" />
                                    </ListItem>
                                </List>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Visibility - LOW" secondary="24140 meters" />
                                    </ListItem>
                                </List>
                            </Grid>
                            

                        </Grid>

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

                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Factor</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">Unit</TableCell>
                                    <TableCell align="right">Influence on delay</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                            
                                {createTableRow(record.factors.VISIBILITY)}
                                {createTableRow(record.factors.CROSSWIND)}
                                {createTableRow(record.factors.TAILWIND)}
                                {createTableRow(record.factors.CLOUDBASE)}
                                {createTableRow(record.factors.RAIN)}

                            </TableBody>
                        </Table>

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