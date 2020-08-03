import React, { useState, useEffect } from 'react';
import {
    TextField,
    List,
    Card,
    ListItem,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Button,
    Modal,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const ageGroups = ['0-2', '3-16', '17-30', '31-45', '46+'];
const states = [
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
];

const formatAge = (age) => {
    console.log(age);
    return (
        <TableContainer container={Card}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Age group</TableCell>
                        <TableCell align="right">
                            Age wise Drug Activity
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array(5)
                        .fill(0)
                        .map((_, i) => {
                            console.log(i);
                            return (
                                <TableRow key={i}>
                                    <TableCell align="right">
                                        {ageGroups[i]}
                                    </TableCell>
                                    <TableCell align="right">
                                        {age[i]}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const formatState = (state) => (
    <TableContainer container={Card}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">
                        State wise Drug Activity
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array(37)
                    .fill(0)
                    .map((_, i) => (
                        <TableRow key={i}>
                            <TableCell align="right">{states[i]}</TableCell>
                            <TableCell align="right">{state[i]}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default function Details() {
    const [data, setData] = useState([]);
    const [currentExpand, setExpand] = useState('');
    const [currentModalType, setModalType] = useState(true);
    const [modalActive, setActive] = useState('');
    const [filter, setFilter] = useState('');

    const currentDataSet = data.find((obj) => obj.drugName === modalActive);

    useEffect(() => {
        fetch('/api/drug/result')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);

    return (
        <>
            <TextField
                label="Search"
                variant="filled"
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            />
            <Grid container spacing={2} alignItems="center" justify="center">
                <List>
                    {data.map((chunk, index) =>
                        chunk.drugName.includes(filter) ? (
                            <Grid item key={index}>
                                <ListItem>
                                    <Card>
                                        <CardHeader title={chunk.drugName} />
                                        <CardContent>
                                            <p>
                                                Source drug activity (DDDs by):{' '}
                                                <br />
                                                Suppliers ={' '}
                                                {
                                                    chunk.sourceDrugActivity
                                                        .supplier
                                                }
                                                <br />
                                                Prescribers ={' '}
                                                {
                                                    chunk.sourceDrugActivity
                                                        .prescriber
                                                }
                                                <br />
                                                Dispenser ={' '}
                                                {
                                                    chunk.sourceDrugActivity
                                                        .dispenser
                                                }
                                            </p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton
                                                onClick={() => {
                                                    setExpand(chunk.drugName);
                                                }}
                                                aria-expanded={
                                                    currentExpand ===
                                                    chunk.drugName
                                                }
                                                aria-label="show more"
                                            >
                                                <ExpandMore />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse
                                            in={
                                                currentExpand === chunk.drugName
                                            }
                                            timeout="auto"
                                        >
                                            <CardContent>
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            setModalType(false);
                                                            setActive(
                                                                chunk.drugName,
                                                            );
                                                        }}
                                                    >
                                                        Group By state
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setModalType(true);
                                                            setActive(
                                                                chunk.drugName,
                                                            );
                                                        }}
                                                    >
                                                        Group By age
                                                    </Button>
                                                </Grid>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </ListItem>
                            </Grid>
                        ) : null,
                    )}
                </List>
            </Grid>
            <Modal
                open={modalActive !== ''}
                onClose={() => {
                    setActive('');
                }}
                aria-labelledby="data-modal"
                aria-describedby="modal-contains-data"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card style={{ height: '60%', width: '60%', overflow: 'auto' }}>
                    {currentDataSet
                        ? currentModalType
                            ? formatAge(currentDataSet.ageDrugActivity)
                            : formatState(currentDataSet.stateDrugActivity)
                        : ''}
                </Card>
            </Modal>
        </>
    );
}
