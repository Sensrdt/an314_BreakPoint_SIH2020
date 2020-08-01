import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import NavBar from './../src/components/MainScreen/index';
import * as serviceWorker from './serviceWorker';
import Routes from './components/Routes';
import App from './App';

const startApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App />
                <Routes />
            </Router>
        </React.StrictMode>,
        document.getElementById('root'),
    );
    serviceWorker.register();
};

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}
