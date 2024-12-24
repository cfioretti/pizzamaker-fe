import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    card: {
        height: 200,
        width: 150,
        boxSizing: "border-box"
    },
    icon: {
        width: 100,
        height: 100,
        paddingTop: 10
    },
    selected: {
        border: "#bbe2dd 2px solid"
    }
}));

export default function PanItem(props) {
    const classes = useStyles();

    const cardClasses = [classes.card];

    const iconPath = "/pans/" + props.shape + "-pan.png";

    if (props.selected === true) {
        cardClasses.push(classes.selected);
    }

    return (
        props.create ? 
            <Card onClick={props.onClick} className={classes.card}>
                <img className={classes.icon} src="/plus.png" alt="Add"/>
                <h4 style={{color: '#223b59'}}>Add Pan</h4>
            </Card>:
            <Card onClick={props.selectHandler} className={cardClasses.join(' ')}>
                <img className={classes.icon} src={iconPath} alt="Pan"/>
                {Object.keys(props.dimensions).map((key) => (
                    <p style={{color: '#223b59'}} key={key}>{key.slice(0, 1).toUpperCase()} {props.dimensions[key]} cm</p>
                ))}
            </Card>
        
    );
}
