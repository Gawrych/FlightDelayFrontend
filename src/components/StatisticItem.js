import React from "react";
import {
    Grid,
    Tooltip,
} from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TodayIcon from '@mui/icons-material/Today';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

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

function StatisticItem ({factor, index, short}) {


    if (factor.status === "NO_DATA") {
        return createStatisticItemWithNoData(factor, index, short);
    }

    if (factor.factor_type === "AVERAGE") {
        return createStatisticItemAverage(factor, index, short);
    }

    if (factor.factor_type === "TOP_VALUE_WITH_DATE") {
        return createStatisticItemTopValueWithDate(factor, index, short);
    }

    if (factor.factor_type === "LIST_OF_VALUES_WITH_TEXT") {
        return createStatisticItemListOfValuesWithText(factor, index, short);
    }
    
}

function createStatisticItemAverage (factor, index, short) {
    let value = Math.ceil(factor.value);
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <StackedBarChartIcon sx={{ color: "#fff" }} />;

    if (factor.unit_symbol === "num") {
        unit = "/mo";
    }

    const secondaryText = value + " " + unit;

    let widthOnGrid = 12;
    if (short === true) {
        widthOnGrid = 6;
    }

    if (factor.id === "AVERAGE_MONTHLY_TRAFFIC") {
        const splitedName = factor.name.split(" ");
        name = splitedName[0] + " " + splitedName[2];
    }

    return (
        <Grid item xs={widthOnGrid} sm={6} md={6} lg={widthOnGrid} key={index} >
            <List sx={{
                backgroundColor: "#E4F1FF",
                padding: "0.3rem",
                borderRadius: "5px",
                borderBottomWidth: "1px",
                borderBottomColor: "#2969EA",
                borderBottomStyle: "solid",}}>
                <ListItem key={index+10}>
                    <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "#2969EA" }}>
                                {icon}
                            </Avatar>
                        </ListItemAvatar>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemTopValueWithDate (factor, index, short) {
    let value = Math.ceil(factor.value);
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <TodayIcon sx={{ color: "#fff" }} />;

    if (factor.unit_symbol === "txt/num") {
        unit = "/mo";
    }

    const date = new Date(factor.date);
    const secondaryText = date.getFullYear() + " " + getMonthName(date.getMonth()) + " - " + value + " " + unit;

    let widthOnGrid = 12;
    if (short === true) {
        widthOnGrid = 6;
    }

    return (
        <Grid item xs={12} sm={6} md={6} lg={widthOnGrid} key={index} >
            <List sx={{
                backgroundColor: "#E4F1FF",
                padding: "0.3rem",
                borderRadius: "5px",
                borderBottomWidth: "1px",
                borderBottomColor: "#2969EA",
                borderBottomStyle: "solid",}}>
                <ListItem key={index+20}>
                    <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "#2969EA" }}>
                                {icon}
                            </Avatar>
                        </ListItemAvatar>
                    <ListItemText primary={name} secondary={secondaryText} />
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemListOfValuesWithText (factor, index, short) { 
    let value = factor.values;
    let unit = factor.unit_symbol;
    let name = factor.name;
    let icon = <FormatListBulletedIcon sx={{ color: "#fff" }} />;

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

    let widthOnGrid = 12;
    if (short === true) {
        widthOnGrid = 6;
    }

    return (
        <Grid item xs={widthOnGrid} sm={6} md={6} lg={widthOnGrid} key={index}>
            <List sx={{
                backgroundColor: "#E4F1FF",
                padding: "0.3rem",
                borderRadius: "5px",
                borderBottomWidth: "1px",
                borderBottomColor: "#2969EA",
                borderBottomStyle: "solid",}}>
                <ListItem key={index+30}>
                    <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "#2969EA" }}>
                                {icon}
                            </Avatar>
                        </ListItemAvatar>
                        <Tooltip title="Cause/group" placement="bottom-start">
                            <ListItemText primary={name} secondary={secondaryText} />
                        </Tooltip>
                </ListItem>
            </List>
        </Grid>
    );
}

function createStatisticItemWithNoData (factor, index, short) {
    let name = factor.name;
    let icon = <WarningAmberIcon sx={{ color: "#fff" }} />;

    let widthOnGrid = 12;
    if (short === true) {
        widthOnGrid = 6;
    }

    return (
        <Grid item xs={12} sm={6} md={6} lg={widthOnGrid} key={index}>
            <List>
                <ListItem key={index+40}>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: "#bebdc0" }} secondaryTypographyProps={{ color: "#bebdc0"}} primary={name} secondary={"No data"} />
                </ListItem>
            </List>
        </Grid>
    );
}

export default StatisticItem;