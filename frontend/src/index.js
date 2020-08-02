import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import 'fontsource-roboto';
// import NavBar from './../src/components/MainScreen/index';
import * as serviceWorker from './serviceWorker';
import App from './App';

const startApp = () => {
    const theme = createMuiTheme({
        palette: {
            common: { black: '#000', white: '#fff' },
            background: { paper: '#fff', default: '#fafafa' },
            primary: {
                light: 'rgba(133, 190, 245, 1)',
                main: 'rgba(74, 154, 233, 1)',
                dark: 'rgba(33, 129, 228, 1)',
                contrastText: '#fff',
            },
            secondary: {
                light: 'rgba(136, 219, 190, 1)',
                main: 'rgba(103, 200, 166, 1)',
                dark: 'rgba(36, 202, 144, 1)',
                contrastText: '#fff',
            },
            error: {
                light: '#e57373',
                main: '#f44336',
                dark: '#d32f2f',
                contrastText: '#fff',
            },
            text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
    });
    ReactDOM.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </React.StrictMode>,
        document.getElementById('root'),
    );
    serviceWorker.unregister();
};

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}
