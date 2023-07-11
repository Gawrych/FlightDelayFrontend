import React, { useState, useEffect, memo } from "react";
import {
    Grid,
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chip from '@mui/material/Chip';
import WeatherItem from "./WeatherItem";


const WeatherGrid = ({ recordChangeHandle }) => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if (records !== recordChangeHandle()) {
            setRecords(recordChangeHandle());
        }
    }, [recordChangeHandle])

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
        let color = "#000";

        if (influence.toLowerCase() === "low") {
            color = "#e7fce9"

        } else if (influence.toLowerCase() === "medium") {
            color = "#fff0e1"

        } else if (influence.toLowerCase() === "high") {
            color = "#F5C7C2"
        }

        return color;
    }

    const setDarkColor = (influence) => {
        let color = "#000";

        if (influence.toLowerCase() === "low") {
            color = "#28AF5F"

        } else if (influence.toLowerCase() === "medium") {
            color = "#e69241"

        } else if (influence.toLowerCase() === "high") {
            color = "#ee786b"
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

    const createSummaryRow = (record) => {
        const finalInfluence = setPeriodFactorInfluence(record.factors);
        const color = setColor(finalInfluence);
        const darkColor = setDarkColor(finalInfluence);

        return (
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                    backgroundColor: color,
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderBottomColor: darkColor,
                    borderBottomStyle: "solid",
                }}
            >
                <Typography sx={{ width: '23%', flexShrink: 0, alignSelf: "center" }}>
                    {parseDate(record.from_time)}
                </Typography>

                <Typography sx={{ width: '4%', flexShrink: 0, alignSelf: "center" }}>
                    -
                </Typography>

                <Typography sx={{ width: '23%', flexShrink: 0, alignSelf: "center" }}>
                    {parseDate(record.to_time)}
                </Typography>

                <Typography sx={{ width: '50%', color: "#000" }}>
                    <Chip
                        label={finalInfluence}
                        sx={{
                            color: "#fff",
                            backgroundColor: setDarkColor(finalInfluence),
                        }}
                    />
                </Typography>
            </AccordionSummary>
        );
    }

    if (!records) {
        return;
    }

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="top">

            {records.map((record, index) => (
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Accordion sx={{ borderWidth: "2" }}>
                        
                        {createSummaryRow(record)}

                        <AccordionDetails sx={{
                            backgroundColor: "#fff",
                            marginTop: "20px"
                        }}>

                            <Grid item container spacing={4}>

                                <WeatherItem factor={record.factors.VISIBILITY} index={index} icon={<VisibilityIcon sx={{ color: "#fff" }}/>} />
                                <WeatherItem factor={record.factors.CROSSWIND} index={index} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                <WeatherItem factor={record.factors.TAILWIND} index={index} icon={<AirIcon sx={{ color: "#fff" }}/>} />
                                <WeatherItem factor={record.factors.CLOUDBASE} index={index} icon={<CloudIcon sx={{ color: "#fff" }}/>} />
                                <WeatherItem factor={record.factors.RAIN} index={index} icon={<WaterDropIcon sx={{ color: "#fff" }}/>} />

                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </Grid>
    );
};

export default memo(WeatherGrid);