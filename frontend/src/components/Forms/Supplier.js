import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, MenuItem } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons/';

const SuplForm = () => {
    const [name, setName] = useState('');
    const [form, setForm] = useState('');
    const [amount, setAmount] = useState(0);
    const [sub, setSub] = useState(0);
    const [drugs, setDrugs] = useState([]);
    const [dosage, setDosage] = useState([]);
    const [strength, setStrength] = useState(0);

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
                    setDosage(
                        data.dosages.dosage
                            .map(({ form }) => form)
                            .filter((x, i, a) => a.indexOf(x) === i),
                    );
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
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        fullWidth
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
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Form"
                        value={form}
                        select
                        onChange={(e) => {
                            setForm(e.target.value);
                        }}
                        variant="outlined"
                    >
                        {dosage.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Strength"
                        value={strength}
                        type="number"
                        onChange={(e) => {
                            setStrength(e.target.value);
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        fullWidth
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
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        fullWidth
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
                <Grid item style={{ width: '100%' }}>
                    <IconButton
                        color="primary"
                        aria-label="Submit form"
                        onClick={() => {
                            console.log('Sending data');
                            fetch('/api/collect/supl', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    payload: {
                                        drug: name,
                                        dosage: {
                                            form,
                                            strength,
                                        },
                                        quantity: {
                                            amount,
                                            sub_amount: sub,
                                            scale: 'g',
                                        },
                                    },
                                }),
                            })
                                .then(console.log)
                                .catch(console.log);
                        }}
                    >
                        <CheckCircleOutline />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default SuplForm;
