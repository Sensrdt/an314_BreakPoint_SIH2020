import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const DrugList = () => {
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        fetch('/api/drug/list')
            .then((res) => res.json())
            .then((data) => {
                setDrugs(data.map((med) => med.name));
            });
    }, []);

    return (
        <>
            <List component="nav" aria-label="drugs">
                {drugs.map((drug) => {
                    return (
                        <ListItem button key={drug}>
                            <ListItemText primary={drug} />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default DrugList;
