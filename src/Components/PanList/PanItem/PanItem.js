import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        height: 200,
        width: 150,
    },
    icon: {
        width: 100,
        height: 100,
        paddingTop: 10
    }
}));

export default function PanItem(props) {
    const classes = useStyles();

    return (
        props.create ? 
            <Card onClick={props.onClick} className={classes.card}>
                <img className={classes.icon} src="/plus.png" alt="Aggiungi"/>
                <h4>Aggiungi teglia</h4>
            </Card>:
            <Card onClick={props.selectHandler} className={classes.card}>
                <img className={classes.icon} src="/pizza-icon.png" alt="Pizza"/>   
                {Object.keys(props.dimensions).map((key) => (
                    <p key={key}>{key.slice(0, 1).toUpperCase()} {props.dimensions[key]} cm</p>
                ))}
            </Card>
        
    );
}