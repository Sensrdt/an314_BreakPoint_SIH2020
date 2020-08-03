import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, MenuItem } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
//TODO: Styling
const DispForm = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [sub, setSub] = useState(0);
    const [form, setForm] = useState('');
    const [drugs, setDrugs] = useState([]);
    const [forms, setForms] = useState([]);
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
                    setForms(
                        data.dosages.dosage
                            .map((a) => a.form)
                            .filter((x, i, a) => a.indexOf(x) === i)
                            .filter((a) => a),
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
                        value={form}
                        onChange={(e) => {
                            setForm(e.target.value);
                        }}
                        variant="outlined"
                    >
                        {forms
                            ? forms.map((option, index) => (
                                  <MenuItem key={index} value={option}>
                                      {option}
                                  </MenuItem>
                              ))
                            : null}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
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
                    <IconButton
                        color="primary"
                        aria-label="Submit form"
                        onClick={() => {
                            fetch('/api/collect/disp', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
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
                            });
                        }}
                    >
                        <CheckCircleOutline />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default DispForm;
