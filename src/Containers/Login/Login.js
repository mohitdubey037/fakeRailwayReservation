import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const theme = createTheme();

function Login() {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    // const getUserData = () => {
    //     axios.post(`http://localhost:3000/l`, form)
    // }

    // useEffect(() => {
    //     getUserData()
    // },[])

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
        };
        setErrors(err);
        if (Object.keys(err).length === 0) return true;
        else return false;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if (form.email === 'admin@fake.com' && form.password === 'admin') {
            localStorage.setItem('login', 'admin');
            localStorage.setItem('emailId', form.email);
            navigate('/dashboard');
        }
        else {
            if (errorValidation()) {
                axios.post(`http://localhost:3000/comments`, form)
                    .then(res => {
                        // console.log(res);
                        localStorage.setItem('emailId', form.email);
                        localStorage.setItem('login', 'user');
                        navigate('/plan-journey-page')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
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
                        Login in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <div>
                            <Grid item xs>
                                <Link href="forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login