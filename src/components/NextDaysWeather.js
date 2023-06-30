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

    const [details, setDetails] = useState("");
    const [currentPeriodId, setCurrentPeriodId] = useState("");
    
    const defaultDetailText = "Click on factor to see details";

    const handleMouseOver = (factorType, id) => {
        let text = "Hover on factor to see details";
        if (factorType === "VISIBILITY") {
          text = "Hello world visibility";
        } else if (factorType === "CROSSWIND") {
            text = "Hello world CROSSWIND";
        }

        setDetails(text);
        setCurrentPeriodId(id);
    };

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

    const createTableRow = (factor, recordId, icon) => {
        const primaryText = <span style={{color: setColor(factor.influence_on_delay) }}> {factor.title} - {factor.influence_on_delay.toLowerCase()} influence</span>;
        const secondaryText = factor.value + " " + factor.unit_name;

        return (
            <>   
                <Grid item xs={12} sm={12} md={3} lg={6}>
                    <List>
                        <ListItemButton onClick={() => handleMouseOver(factor.id, recordId)}>
                            <ListItem>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={primaryText} secondary={secondaryText} />
                                </ListItem>
                        </ListItemButton>
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

                                {createTableRow(record.factors.VISIBILITY, record.id, <VisibilityIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.CROSSWIND, record.id, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.TAILWIND, record.id, <AirIcon sx={{ color: "#AAAAAA" }}/>)}
                                {createTableRow(record.factors.CLOUDBASE, record.id, <CloudIcon sx={{ color: "#00bbf9" }}/>)}
                                {createTableRow(record.factors.RAIN, record.id, <WaterDropIcon sx={{ color: "#00bbf9" }}/>)}

                                <Grid item xs={12} sm={12} md={3} lg={6}>
                                    <List>
                                    <ListItemButton>
                                        <ListItem> 
                                            <ListItemIcon>
                                                <InfoOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText key={record.id} primary="Details" secondary={currentPeriodId === record.id ? details : defaultDetailText} />
                                        </ListItem>
                                        </ListItemButton>
                                    </List>
                            </Grid>

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