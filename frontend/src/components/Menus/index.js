import React from 'react';
import history from '../history';
import {
    Button,
    Grid,
    Avatar,
    makeStyles,
    Paper,
    Fab,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export default function ShowData({ session }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>G</Avatar>
                    </Grid>
                    <Grid
                        item
                        xs
                        zeroMinWidth
                        onClick={() => history.push('/guide', '')}
                    >
                        <Button>View Guidelines</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>D</Avatar>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        onClick={() => history.push('/drugs', '')}
                    >
                        <Button>Drugs Details</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>T</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>T&C for Doctors</Button>
                    </Grid>
                </Grid>
            </Paper>
            {session.email ? (
                <Fab
                    variant="extended"
                    style={{
                        margin: 0,
                        top: 'auto',
                        right: 20,
                        bottom: 20,
                        left: 'auto',
                        position: 'fixed',
                    }}
                    onClick={() => {
                        const map = {
                            Prescriber: '/pres',
                            Supplier: '/supl',
                            Dispensary: '/disp',
                        };
                        history.push(map[session.userType]);
                    }}
                >
                    <Add />
                    Add data
                </Fab>
            ) : null}
        </div>
    );
}
