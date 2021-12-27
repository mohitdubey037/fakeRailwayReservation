import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';

import '../PlanJourneyPage/PlanJourneyPage.css';
import './Dashboard.css';

import Navbar from "../Navbar/Navbar";
import Sidebar from '../SideBar/Sidebar';

import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
    paginate: {
        display: 'flex',
        justifyContent: 'center'
    }
})
);

const Dashboard = () => {
    const classes = useStyles();

    const emailId = localStorage.getItem('emailId');
    const role = localStorage.getItem('login');

    let postsPerPage = 5;

    const [calculatePages, setCalculatePages] = useState();
    const [page, setPage] = React.useState(1);

    const [data, setData] = useState([]);
    const [source, setSource] = useState({
        source: ''
    })
    const [destination, setDestination] = useState({
        destination: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "source") {
            setSource({
                [name]: value
            })
        }
        else {
            setDestination({
                [name]: value
            })

        }
    }

    const handleSource = () => {
        setData(data.filter(d => {
            return (
                d.source === source.source
            )
        })
        )
    }
    const handleDestination = () => {
        setData(data.filter(d => {
            return (
                d.destination === destination.destination
            )
        })
        )
    }

    const getAllPost = () => {
        axios.get(`http://localhost:3000/posts`)
            .then(res => {
                setCalculatePages(Math.ceil(res.data.length / postsPerPage))
            })
    }

    const getPaginatedPost = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        getAllPost();
    }, [])

    useEffect(() => {
    }, [calculatePages])

    useEffect(() => {
        if (role !== 'admin') {
            axios.get(`http://localhost:3000/posts?emailId=${emailId}&_page=${page}&_limit=5`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.get(`http://localhost:3000/posts?_page=${page}&_limit=5`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [page])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(resp => {
                window.location.reload();
            })
    }

    const handleDeleteAll = () => {
        const apiCalls = data.map(item =>
            new Promise((resolve, reject) =>
                resolve(
                    axios.delete(`http://localhost:3000/posts/${item.id}`)
                )
            )
        );
        Promise.all(apiCalls)
            .then((data) => {
                console.log("data", data)
                window.location.reload()
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <>
            <Sidebar />
            <div className="navbar_datas">
                <Navbar />
                {data.length > 0 &&
                    <div className="search">
                        <div className="search_child">
                            <p>Source</p>
                            <input type="text" onChange={(e) => handleChange(e)} name="source" />
                            <button onClick={handleSource}>Search</button>
                        </div>
                        <div className="search_child">
                            <p>Destination</p>
                            <input type="text" onChange={(e) => handleChange(e)} name="destination" />
                            <button onClick={handleDestination}>Search</button>
                        </div>
                        {role === 'admin' &&
                            <button onClick={handleDeleteAll}>Delete all</button>
                        }
                    </div>
                }
                <div className="datas">
                    {data.length > 0 &&
                        data.map(d => {
                            return (
                                <>
                                    <div className="dashboard_parent">
                                        {/* <div className="dashboard_source"> */}
                                        <div className="child_div">
                                            <p>Source</p>
                                            <p>{d.source}</p>
                                        </div>
                                        <div className="child_div">
                                            <p>Destination</p>
                                            <p>{d.destination}</p>
                                        </div>
                                        <div className="child_div">
                                            <p>Date</p>
                                            <p>{d.date}</p>
                                        </div>
                                        <button onClick={() => handleDelete(d.id)}>Delete</button>
                                        {/* </div> */}
                                    </div>
                                </>
                            )
                        }
                        )}
                    <Pagination className={classes.paginate} count={calculatePages} onChange={getPaginatedPost} />
                </div>
            </div>
        </>
    )
}
export default Dashboard