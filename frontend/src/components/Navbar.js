import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Button,
} from '@material-ui/core';
import { Add, AccountCircle } from '@material-ui/icons';
import history from './history';

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

export default function Navbar({ isLoggedIn, email }) {
    const classes = useStyles();

    const ProfileIcon = isLoggedIn ? AccountCircle : Add;
    const toolTipText = isLoggedIn ? `Logout (${email})` : 'Log-In';

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title={toolTipText}>
                        <IconButton
                            aria-label="add"
                            onClick={() => {
                                if (!isLoggedIn)
                                    return history.push('/login', '');
                                else {
                                    fetch('/auth/logout').then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            }}
                        >
                            <ProfileIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        className={classes.title}
                        onClick={() => history.push('/')}
                    >
                        <Typography variant="h6" className={classes.title}>
                            Reelitin
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
