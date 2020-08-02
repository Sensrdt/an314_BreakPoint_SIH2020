import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Person, Facebook } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const joinOptions = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                spacing={4}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={8}>
                    <Typography variant="h4" gutterBottom>
                        Sign In Options
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Person />}
                        onClick={() => {
                            window.location =
                                'https://reelitin.herokuapp.com/auth/google';
                        }}
                    >
                        Sign In With Google
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Facebook />}
                    >
                        Sign In With Facebook
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default joinOptions;
