import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import history from '../history';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton aria-label="add">
                        <AddIcon onClick={() => history.push('/login', '')} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Reelitin
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
