import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Dashboard from './Containers/Dashboard/Dashboard';
import PlanJourneyPage from './Containers/PlanJourneyPage/PlanJourneyPage';

import { Route, Routes } from "react-router-dom";

import './App.css';
import ForgotPassword from './Containers/Forgot_Password';

function App() {


  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/newReactPage" component={NewReactPage}/> */}
        <Route path="/" element={<Login/>} />
        <Route path="/plan-journey-page" element={<PlanJourneyPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>

    </div>
  );
}

export default App;
