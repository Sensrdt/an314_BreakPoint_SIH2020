import React, { useState } from 'react';
import {
    Typography,
    Grid,
    TextField,
    MenuItem,
    IconButton,
} from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

export default function ExtraDetails({ email }) {
    const [location, setLocation] = useState('');
    const [userType, setUserType] = useState('');

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography>Extra details needed for {email} </Typography>
            <Grid item>
                <TextField
                    select
                    id="outlined-required"
                    label="State"
                    variant="outlined"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                >
                    {[
                        'Andhra Pradesh',
                        'Arunachal Pradesh',
                        'Assam',
                        'Bihar',
                        'Chhattisgarh',
                        'Goa',
                        'Gujarat',
                        'Haryana',
                        'Himachal Pradesh',
                        'Jharkhand',
                        'Karnataka',
                        'Kerala',
                        'Madhya Pradesh',
                        'Maharashtra',
                        'Manipur',
                        'Meghalaya',
                        'Mizoram',
                        'Nagaland',
                        'Odisha',
                        'Punjab',
                        'Rajasthan',
                        'Sikkim',
                        'Tamil Nadu',
                        'Telangana',
                        'Tripura',
                        'Uttarakhand',
                        'Uttar Pradesh',
                        'West Bengal',
                        'Andaman and Nicobar Islands',
                        'Chandigarh',
                        'Dadra and Nagar Haveli',
                        'Daman & Diu',
                        'The Government of NCT of Delhi',
                        'Jammu & Kashmir',
                        'Ladakh',
                        'Lakshadweep',
                        'Puducherry',
                    ].map((state, index) => (
                        <MenuItem key={index} value={state}>
                            {state}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    select
                    id="outlined-required"
                    label="Job"
                    variant="outlined"
                    value={userType}
                    onChange={(e) => {
                        setUserType(e.target.value);
                    }}
                >
                    {['Supplier', 'Prescriber', 'Dispensary'].map((post) => (
                        <MenuItem key={post} value={post}>
                            {post}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                <IconButton
                    color="primary"
                    aria-label="Submit form"
                    onClick={() => {
                        fetch('/api/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                location,
                                userType,
                            }),
                        });
                    }}
                >
                    <CheckCircleOutline />
                </IconButton>
            </Grid>
        </Grid>
    );
}
