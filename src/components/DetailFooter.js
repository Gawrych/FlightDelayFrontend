import React from "react";
import {
    Box,
    Grid, Typography,
} from "@mui/material";


const DetailFooter = () => {

    return (
        <>
                <Box sx={{
                        width: "100%",
                        color: "#fff",
                        backgroundColor: "#4645d8",
                        display: "flex",
                        alignItems: "right",
                        alignContent: "center",
                        justifyContent: "center"}}>
                    <Grid container xs={12} sm={12} md={12} lg={11} sx={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "right",
                                alignContent: "center",
                                justifyContent: "center",}}>



                        <Typography variant="h5">Hello world</Typography>
                    </Grid>
                </Box>
        </>
    );
};

export default DetailFooter;