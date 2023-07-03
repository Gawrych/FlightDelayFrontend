import React, { useState, useEffect } from "react";
import {
    Grid,
} from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
}

const capitalizeFirstLowercaseRest = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
};

function StatisticItem ({factor, index, phase}) {
    if (factor.flight_phase !== phase && factor.flight_phase !== "DEPARTURE_AND_ARRIVAL") {
        return;
    }

    if (factor.status === "NO_DATA") {
        return createStatisticItemWithNoData(factor, index);
    }

    if (factor.factor_type === "AVERAGE") {
        return createStatisticItemAverage(factor, index);
    }

    if (factor.factor_type === "TOP_VALUE_WITH_DATE") {
        return createStatisticItemTopValueWithDate(factor, index);
    }

    if (factor.factor_type === "TOP_VALUE_WITH_PRECISION_DATE") {
        return createStatisticItemTopValueWithPrecisionDate(factor, index);
    }

    if (factor.factor_type === "LIST_OF_VALUES_WITH_TEXT") {
        return createStatisticItemListOfValuesWithText(factor, index);
    }
}

function createStatisticItemAverage (factor, index) {
    let value = Math.ceil(factor.value);
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <StackedBarChartIcon />;

    if (factor.unit_symbol === "num") {
        unit = "dep/arr";
    }

    const secondaryText = value + " " + unit;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemTopValueWithDate (factor, index) {
    let value = Math.ceil(factor.value);
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <TodayIcon />;

    if (factor.unit_symbol === "txt/num") {
        unit = "dep/arr";
    }

    const date = new Date(factor.date);
    const secondaryText = date.getFullYear() + " " + getMonthName(date.getMonth()) + " - " + value + " " + unit;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemTopValueWithPrecisionDate (factor, index) {
    let value = Math.ceil(factor.value);
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <CalendarTodayIcon />;

    if (factor.unit_symbol === "txt/num") {
        unit = "dep/arr";
    }

    const date = new Date(factor.date);
    const secondaryText = date.getFullYear() + " " + getMonthName(date.getMonth()) + " " + date.getDate() + " - " + value + " " + unit;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemListOfValuesWithText (factor, index) { 
    let value = factor.values;
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <FormatListBulletedIcon />;

    if (factor.unit_symbol === "txt/num") {
        unit = "";
    }

    if (factor.unit_symbol === "txt/min") {
        unit = "min";
    }

    const arrayWithoutOtherItem = value.filter((cause) => cause.text !== "OTHER");

    if (arrayWithoutOtherItem.length === 0) {
        return;
    }

    const text = capitalizeFirstLowercaseRest(arrayWithoutOtherItem[0].text);

    let valueResult = " - " + arrayWithoutOtherItem[0].value;
    if (factor.unit_symbol === "txt/num") {
        valueResult = "";
    }

    const secondaryText = text.replace("_", " ") + valueResult + " " + unit;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemWithNoData (factor, index) { 
    let name = factor.name;
    let icon = <WarningAmberIcon />;

    return (
        <Grid item container xs={6} sm={6} md={6} lg={6}>
            <List>
                <ListItem key={index}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} secondary={"No data"} />
                </ListItem>
            </List>
        </Grid>
    );
}

export default StatisticItem;