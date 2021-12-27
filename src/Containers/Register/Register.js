import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

import './Register.css'

const theme = createTheme();

function Register(props) {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        // console.log(name, value)
        setForm({
            ...form,
            [name]: value
        })
    }

    // useEffect(() => {
    //     console.log(form);
    // }, [form])

    // useEffect(() => {
    //     console.log(errors);
    // }, [errors])

    const errorValidation = () => {
        const err = {};
        if (form.email === "") {
            err.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            err.email = "Invalid email address.";
        } else if (form.password === "") {
            err.password = "Password is required.";
        } else if (form.password.length < 6) {
            err.password = "Password must be 8 characters in length.";
        } else if (form.password.length > 64) {
            err.password = "Password cannot be more than 64 characters in length.";
        } else if (form.password !== form.confirmPassword) {
            err.confirmPassword = "password and confirm password doesn't match";
        } else if (form.mobileNumber === "") {
            err.mobileNumber = "Phone is required.";
        } else if (form.mobileNumber.match(/[^0-9]/g)) {
            err.mobileNumber = "Phone number must be digit.";
        } else if (form.mobileNumber.length < 10) {
            err.mobileNumber = "Phone must be of 10 digits.";
        }
        setErrors(err);
        if (Object.keys(err).length === 0) return true;
        else return false;
        ;
    }

    const handleRegister = (event) => {
        event.preventDefault();
        if (errorValidation()) {
            axios.post(`http://localhost:3000/comments`, form)
                .then(res => {
                    // console.log(res);
                    navigate('/plan-journey-page')
                })
                .catch(err => {
                    console.log(err);
                })
        }
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
    };



    return (
        <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <div className="input_with_error">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                onChange={(e) => handleChange(e)}
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            {errors.email && (
                                <p className="error_para">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="input_with_error">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={(e) => handleChange(e)}
                                id="password"
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <p className="error_para">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="input_with_error">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onChange={(e) => handleChange(e)}
                                id="confirm_password"
                                autoComplete="current-password"
                            />
                            {errors.confirmPassword && (
                                <p className="error_para">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="input_with_error">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="mobileNumber"
                                label="Mobile Number"
                                type="number"
                                onChange={(e) => handleChange(e)}
                                id="mobileNumber"
                                autoComplete="current-password"
                            />
                            {errors.mobileNumber && (
                                <p className="error_para">
                                    {errors.mobileNumber}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register
