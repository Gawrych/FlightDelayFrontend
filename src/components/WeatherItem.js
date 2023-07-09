import React, { memo } from "react";
import {
    Grid,
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


const WeatherItem = ({ factor, index, icon, longGrid }) => {

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

    let widthOnGrid = 6;
    if (longGrid === true) {
        widthOnGrid = 12;
    }

    const darkColor = setDarkColor(factor.influence_on_delay);

    return (
        <Grid item xs={6} sm={6} md={6} lg={widthOnGrid}>
            <List sx={{
                    backgroundColor: setColor(factor.influence_on_delay),
                    padding: "0.3rem",
                    borderRadius: "5px",
                    display: "flex", 
                    alignItems: "center",
                    borderBottomWidth: "1px",
                    borderBottomColor: darkColor,
                    borderBottomStyle: "solid",}}>
                <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar sx={{
                                backgroundColor: darkColor}}>
                                {icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={factor.title} secondary={factor.value + " " + factor.unit_name} />
                </ListItem>
            </List>
        </Grid>
    );
};

export default memo(WeatherItem);