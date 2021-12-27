import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import './PlanJourneyPage.css';
import profileIcon from '../../assets/profile.svg';
import Navbar from '../Navbar/Navbar'
import SvgIcon from '@mui/material/SvgIcon';

import { useLocation } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";

const theme = createTheme();

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function PlanJourneyPage(props) {

    const location = useLocation();
    const emailId = localStorage.getItem('emailId');
    const [form, setForm] = useState({
        source: '',
        destination: '',
        emailId: emailId,
        date: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleCreateReservation = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/posts`, form)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <Sidebar />
            <div className="navbar_datas">
                <Navbar />
                <ThemeProvider theme={theme}>
                    <div className="plan_journey_container">
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Plan A Journey
                                </Typography>
                                <Box component="form" onSubmit={handleCreateReservation} noValidate sx={{ mt: 1 }}>
                                    {/* <div className="datePickers"> */}
                                    <input style={{ width: '100%' }} name="date" type="date" placeholder="Enter Date" onChange={(e) => handleChange(e)} />
                                    {/* </div> */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="source"
                                        type="text"
                                        id="source"
                                        label="source"
                                        onChange={(e) => handleChange(e)}
                                        autoComplete="source"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="destination"
                                        type="text"
                                        id="destination"
                                        label="destination"
                                        onChange={(e) => handleChange(e)}
                                        autoComplete="destination"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Create Reservation
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}

export default PlanJourneyPage