import SvgIcon from '@mui/material/SvgIcon';
import { useLocation, NavLink } from "react-router-dom";
import profileIcon from '../../assets/profile.svg';
import './Sidebar.css';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function Sidebar() {
    const role = localStorage.getItem('login');
    const location = useLocation();

    return (
        <div className="container-sidebar">
            <div className="sidebar-menu">
                <NavLink to="/dashboard" className="dashboard-icon icons" >
                    <div>
                        <HomeIcon color="black" />
                    </div>
                    <p className="navlink" style={{ color: location.pathname === '/dashboard' && 'blue' }}>Dashboard</p>
                </NavLink>
                {role !== 'admin' &&
                    <NavLink to="/plan-journey-page" className="profile-icon icons">
                        <img src={profileIcon} alt="dashboard icon" />
                        <p className="navlink" style={{ color: location.pathname === '/plan-journey-page' && 'blue' }}>Plan Journey</p>
                    </NavLink>
                }
            </div>
        </div>
    )
}

export default Sidebar