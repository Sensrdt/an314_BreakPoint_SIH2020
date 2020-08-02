import React from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
// import SuplForm from './components/SuplForm';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Router>
                <Routes />
            </Router>
            {/* <SuplForm /> */}
        </div>
    );
}

export default App;
