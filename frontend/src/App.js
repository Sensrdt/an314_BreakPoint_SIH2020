import React from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default App;
