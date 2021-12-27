import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar(props) {
    // const url = useHistory.location.pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const emailId = localStorage.getItem('emailId');

    const [profile, setProfile] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3000/profile`)
            .then((res) => {
                setProfile(res.data.email);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <div className="Navbar">
            <div className="Navbar_child">
                <p>Fake Reservations</p>
                <p>{emailId}</p>
                <p>{location.pathname.slice(1)}</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Navbar;
