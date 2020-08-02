import React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons/';

const DispForm = () => {
    return (
        <>
            <h1>Dispensary Form</h1>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <TextField
                        required
                        id="outlined-required"
                        label="Generic Name"
                        defaultValue=""
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="outlined-required"
                        label="Form"
                        defaultValue=""
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Strength"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Subamount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <IconButton color="primary" aria-label="Submit form">
                        <CheckCircleOutline />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default DispForm;
