import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, MenuItem } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons/';
//TODO: Styling
const SuplForm = () => {
    const [name, setName] = useState('');
    const [dose, setDose] = useState(0);
    const [amount, setAmount] = useState(0);
    const [sub, setSub] = useState(0);
    const [drugs, setDrugs] = useState([]);
    const [dosage, setDosage] = useState([]);

    useEffect(() => {
        fetch('/api/drug/list')
            .then((res) => res.json())
            .then((data) => {
                setDrugs(data.map((med) => med.name));
            });
    }, []);
    useEffect(() => {
        if (name) {
            fetch(`/api/drug/get/${name}`)
                .then((res) => res.json())
                .then((data) => {
                    setDosage(data.dosages.dosage);
                });
        }
    }, [name]);

    return (
        <>
            <h1>Supply Form</h1>
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
                        value={name}
                        select
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        variant="outlined"
                    >
                        {drugs.map((option) => (
                            <MenuItem key={option.value} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        select
                        id="outlined-required"
                        label="Form"
                        value={dose}
                        onChange={(e) => {
                            setDose(e.target.value);
                        }}
                        variant="outlined"
                    >
                        {dosage.map((option, index) => (
                            <MenuItem key={index} value={index}>
                                {`${option.route} => ${option.form}||${option.strength}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setAmount(Math.abs(e.target.value));
                        }}
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
                        value={sub}
                        onChange={(e) => {
                            setSub(Math.abs(e.target.value));
                        }}
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

export default SuplForm;
