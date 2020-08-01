import React from 'react';
import NavBar from './components/MainScreen/index';
import StatData from './components/ShowData/index';
import './App.css';

function App() {
    return (
        <div className="App">
            {/* <h1>Line Chart</h1>
                <br />
                <GraphLineChart /> */}
            <NavBar />
            <StatData />
        </div>
    );
}

export default App;
