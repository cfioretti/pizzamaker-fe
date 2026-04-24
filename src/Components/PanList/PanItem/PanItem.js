import React from 'react';
import Card from '@material-ui/core/Card';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        height: 200,
        width: 150,
        boxSizing: "border-box",
        position: 'relative',
        cursor: 'pointer',
        transition: 'box-shadow 150ms ease, transform 150ms ease, border-color 150ms ease',
        '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)',
        },
        '&:focus-visible': {
            outline: `3px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
        },
        '&:focus:not(:focus-visible)': {
            outline: 'none',
        },
    },
    selected: {
        border: `3px solid ${theme.palette.primary.main}`,
        boxShadow: `0 0 0 4px ${theme.palette.brand.mint}`,
    },
    icon: {
        width: 100,
        height: 100,
        paddingTop: 10,
    },
    label: {
        color: theme.palette.secondary.main,
    },
    checkIcon: {
        position: 'absolute',
        top: 6,
        right: 6,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '50%',
    },
}));

const shapeLabels = {
    round: "Round pan",
    square: "Square pan",
    rectangular: "Rectangular pan",
};

const measureLabels = {
    diameter: "diameter",
    edge: "edge",
    width: "width",
    length: "length",
};

function buildAriaLabel(shape, dimensions) {
    const shapeName = shapeLabels[shape] || "Pan";
    const dims = Object.keys(dimensions || {})
        .map(key => `${measureLabels[key] || key} ${dimensions[key]} centimeters`)
        .join(", ");
    return dims ? `${shapeName}, ${dims}` : shapeName;
}

const activateOnKey = (handler) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (handler) handler();
    }
};

export default function PanItem(props) {
    const classes = useStyles();

    if (props.create) {
        return (
            <Card
                className={classes.card}
                onClick={props.onClick}
                onKeyDown={activateOnKey(props.onClick)}
                role="button"
                tabIndex={0}
                aria-label="Add new pan"
            >
                <img className={classes.icon} src="/plus.png" alt="" />
                <span className={classes.label} aria-hidden="true">Add Pan</span>
            </Card>
        );
    }

    const cardClasses = [classes.card];
    if (props.selected === true) {
        cardClasses.push(classes.selected);
    }

    const iconPath = "/pans/" + props.shape + "-pan.png";
    const ariaLabel = buildAriaLabel(props.shape, props.dimensions);

    return (
        <Card
            className={cardClasses.join(' ')}
            onClick={props.selectHandler}
            onKeyDown={activateOnKey(props.selectHandler)}
            role="button"
            tabIndex={0}
            aria-pressed={!!props.selected}
            aria-label={ariaLabel}
        >
            {props.selected && (
                <CheckCircleIcon
                    className={classes.checkIcon}
                    fontSize="small"
                    aria-hidden="true"
                />
            )}
            <img className={classes.icon} src={iconPath} alt="" />
            {Object.keys(props.dimensions).map((key) => (
                <p className={classes.label} key={key} aria-hidden="true">
                    {key.slice(0, 1).toUpperCase()} {props.dimensions[key]} cm
                </p>
            ))}
        </Card>
    );
}
