import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const DrugList = () => {
    // const [state, setState] = useState([]);

    // useEffect(() => {
    //     // fetch happens
    // }, []);

    let drugs = ['A', 'B', 'C'];

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
