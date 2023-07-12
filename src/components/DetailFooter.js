import React from "react";
import {
    Box,
    Grid, Typography,
    Link,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const DetailFooter = () => {

    const customTheme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1372,
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
                        backgroundColor: "#4645d8",
                        display: "flex",
                        alignItems: "right",
                        alignContent: "center",
                        justifyContent: "center",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",}}>
                    <Grid container gap={10} sx={{
                                    display: "flex",
                                    flexDirection: "column"}}>

                        <Grid container item sx={{
                                    display: "flex",
                                    alignContent: "center",
                                    justifyContent: "center",}}>

                            <Grid item gap={2} xs={6} sm={5} md={2} lg={2} sx={{
                                    display: "flex",
                                    textAlign: "left",
                                    marginTop: {xs: "3rem", md: "1rem"},
                                    justifyContent: "center",
                                    flexDirection: "column"}}>
                
                                    <Typography variant="h6">Social</Typography>
                                    <Typography variant="body1" sx={{ display: "inline-flex", alignItems: "center", }}><LinkedInIcon sx={{ fontSize: "large", display: "inline-flex", alignItems: "center", marginRight: "0.3rem" }} /> LinkedIn</Typography>
                                    <Typography variant="body1"><Link href="https://github.com/Gawrych" sx={{ fontWeight: "500", color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", }}><GitHubIcon sx={{ fontSize: "large", display: "inline-flex", alignItems: "center", marginRight: "0.3rem" }} /> GitHub </Link></Typography>
                            </Grid>

                            <Grid item gap={1} xs={5} sm={5} md={2} lg={2} sx={{
                                    textAlign: "left",
                                    display: "flex",
                                    marginTop: {xs: "3rem", md: "1rem"},
                                    flexDirection: "column"}}>

                                <Typography variant="h6">Author</Typography>
                                <Typography variant="body1">Paweł Gawrych</Typography>
                            </Grid>
                        
                            <Grid item gap={1} xs={11} sm={5} md={3} lg={3} sx={{
                                    textAlign: "left",
                                    display: "flex",
                                    marginTop: {xs: "3rem", md: "1rem"},
                                    flexDirection: "column"}}>

                                <Typography variant="h6">Contact</Typography>
                                <Typography variant="body1">pawelgawrych203@gmail.com</Typography>
                            </Grid>

                            <Grid item gap={1} xs={11} sm={5} md={3} lg={3} sx={{
                                    textAlign: "left",
                                    display: "flex",
                                    marginTop: {xs: "3rem", md: "1rem"},
                                    flexDirection: "column"}}>

                                <Typography variant="h6">Terms of use</Typography>
                                <Typography variant="body1">All data is released to the Public Domain, and comes with no guarantee of accuracy or fitness for use.</Typography>
                            </Grid>
                        </Grid>

                        <Grid container gap={5} item sx={{
                                    display: "flex",
                                    alignItems: "right",
                                    alignContent: "center",
                                    justifyContent: "center",}}>

                            <Grid item gap={1} xs={11} sm={11} md={11} lg={5} sx={{
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "column"}}>

                                <Typography variant="body1">Copyright Notice and Disclaimer <Link href="https://www.eurocontrol.int" sx={{ fontWeight: "600", color: "white", textDecoration: "none" }}>Eurocontrol</Link></Typography>
                                <Typography variant="body2">I would like to express my sincere appreciation to Eurocontrol for providing data. The data published on this website is provided by the © EUROCONTROL Performance Review Unit. The information does not necessarily reflect the official views or policy of EUROCONTROL, which makes no warranty, either implied or expressed, for the information contained in this website, including its accuracy, completeness or usefulness.</Typography>
                            </Grid>

                            <Grid item gap={1} xs={11} sm={11} md={11} lg={5} sx={{
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "column"}}>

                                <Typography variant="body1">Copyright Notice and Disclaimer <Link href="https://www.ourairports.com" sx={{ fontWeight: "600", color: "white", textDecoration: "none" }}>OurAirports</Link></Typography>
                                <Typography variant="body2">I would like to express my sincere appreciation to OurAirports for providing data on the public domain. Their dedication to sharing valuable information has greatly enriched my website and allowed me to offer comprehensive and reliable content to our users. I am grateful for their commitment to fostering an open and collaborative environment in the aviation community.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default DetailFooter;