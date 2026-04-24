import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
        border: `2px solid ${theme.palette.brand.mint}`
    },
    label: {
        color: theme.palette.secondary.main
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
                <h4 className={classes.label}>Add Pan</h4>
            </Card>:
            <Card onClick={props.selectHandler} className={cardClasses.join(' ')}>
                <img className={classes.icon} src={iconPath} alt="Pan"/>
                {Object.keys(props.dimensions).map((key) => (
                    <p className={classes.label} key={key}>{key.slice(0, 1).toUpperCase()} {props.dimensions[key]} cm</p>
                ))}
            </Card>

    );
}
