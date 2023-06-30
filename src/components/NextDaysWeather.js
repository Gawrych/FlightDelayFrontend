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
import Paper from '@mui/material/Paper';

function NextDaysWeather({ nextDaysWeatherRecords }) {

    const [expanded, setExpanded] = useState(false);
    
    console.log("Here!");
    console.log(nextDaysWeatherRecords);

    if (!nextDaysWeatherRecords) {
        return;
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center">

                {nextDaysWeatherRecords.map((record) => (

                <Grid item xs={12} sm={6} md={6} lg={6}>

                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                        <Typography sx={{ width: '50%', flexShrink: 0 }}>
                            {record.from_time.replace("T", " ")} - {record.to_time.replace("T", " ")}
                        </Typography>

                        <Typography sx={{ width: '50%', color: 'green' }}>Low</Typography>
                    </AccordionSummary>

                    <AccordionDetails>

                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Factor</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">Influence on delay</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                        <TableCell component="th" scope="row">
                                            {record.factors[0].title}
                                        </TableCell>

                                        <TableCell align="right" component="th" scope="row">
                                            {record.factors[0].value}
                                        </TableCell>

                                        <TableCell align="right" component="th" scope="row">
                                            {record.factors[0].influence_on_delay}
                                        </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </AccordionDetails>
                    </Accordion>

                    </Grid>
                ))}

            </Grid>
    </div>
            
    );
}

export default NextDaysWeather;