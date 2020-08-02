import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
// const regions = [
//     'Andhra Pradesh',
//     'Arunachal Pradesh',
//     'Assam',
//     'Bihar',
//     'Chhattisgarh',
//     'Goa',
//     'Gujarat',
//     'Haryana',
//     'Himachal Pradesh',
//     'Jharkhand',
//     'Karnataka',
//     'Kerala',
//     'Madhya Pradesh',
//     'Maharashtra',
//     'Manipur',
//     'Meghalaya',
//     'Mizoram',
//     'Nagaland',
//     'Odisha',
//     'Punjab',
//     'Rajasthan',
//     'Sikkim',
//     'Tamil Nadu',
//     'Telangana',
//     'Tripura',
//     'Uttarakhand',
//     'Uttar Pradesh',
//     'West Bengal',
//     'Andaman and Nicobar Islands',
//     'Chandigarh',
//     'Dadra and Nagar Haveli',
//     'Daman & Diu',
//     'The Government of NCT of Delhi',
//     'Jammu & Kashmir',
//     'Ladakh',
//     'Lakshadweep',
//     'Puducherry',
// ];

export default function Details() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        fetch('/api/drug/list')
            .then((res) => res.json())
            .then((data) => {
                setDrugs(data.map((med) => med.name));
            });
    }, []);

    // const [Region, setRegion] = useState(regions[0]);
    // const handleChange = (event) => {
    //     setRegion(event.target.value);
    // };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select Drugs"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    helperText="Select drugs to see the stats"
                >
                    {drugs.map((option) => (
                        <MenuItem key={option.value} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </form>
    );
}
