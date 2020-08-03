import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, MenuItem } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons/';

const PresForm = () => {
    const [target, setTarget] = useState('');
    const [targets, setTargets] = useState([]);
    const [drug, setDrug] = useState('');
    const [drugs, setDrugs] = useState([]);
    const [strength, setStrength] = useState(0.0);
    const [duration, setDuration] = useState(0.0);
    const [ageGroup, setAge] = useState('0-2');
    const [route, setRoute] = useState('local');

    useEffect(() => {
        fetch('/api/target/list')
            .then((res) => res.json())
            .then((res) => {
                setTargets(res);
            });
    }, []);
    useEffect(() => {
        if (target)
            fetch(`/api/drug/target/${target.id}`)
                .then((res) => res.json())
                .then((res) => {
                    setDrugs(res);
                });
    }, [target]);

    return (
        <>
            <h1>Prescriber&apos;s Form</h1>
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
                        id="outlined-required"
                        label="Target Name"
                        select
                        fullWidth
                        variant="outlined"
                        value={target}
                        onClick={(e) => {
                            setTarget(e.target.value);
                        }}
                    >
                        {targets.map((option) => (
                            <MenuItem key={option.id} value={option}>
                                {option.dname}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Drug Name"
                        select
                        fullWidth
                        variant="outlined"
                        value={drug}
                        onClick={(e) => {
                            setDrug(e.target.value);
                        }}
                    >
                        {drugs
                            ? drugs.map((option) => (
                                  <MenuItem
                                      key={option.drugbank_id}
                                      value={option.name}
                                  >
                                      {option.name}
                                  </MenuItem>
                              ))
                            : null}
                    </TextField>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Strength"
                        value={strength}
                        fullWidth
                        type="number"
                        onChange={(e) => {
                            setStrength(e.target.value);
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        select
                        id="outlined-required"
                        label="Method"
                        fullWidth
                        value={route}
                        onChange={(e) => {
                            setRoute(e.target.value);
                        }}
                    >
                        {[
                            'Convenience',
                            'Desired target effect',
                            'Oral',
                            'Local',
                            'Mouth inhalation',
                            'Nasal inhalation',
                            'Parenteral',
                            'Intranasal',
                            'Sublingual',
                            'Buccal',
                            'Sublabial',
                            'Suppository',
                        ].map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Duration"
                        fullWidth
                        value={duration}
                        type="number"
                        onChange={(e) => {
                            setDuration(e.target.value);
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        required
                        select
                        id="outlined-required"
                        label="Age group"
                        value={ageGroup}
                        fullWidth
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                    >
                        {['0-2', '3-16', '17-30', '31-45', '46+'].map(
                            (option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ),
                        )}
                    </TextField>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <IconButton
                        color="primary"
                        aria-label="Submit form"
                        onClick={() => {
                            fetch('/api/collect/pres', {
                                method: 'POST',
                                // credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    payload: {
                                        drug,
                                        dosage: {
                                            route,
                                            strength,
                                        },
                                        target: target.id,
                                        ageGroup,
                                        duration,
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

export default PresForm;
