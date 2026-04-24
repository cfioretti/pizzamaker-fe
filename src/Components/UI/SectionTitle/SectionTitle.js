import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.main,
        fontWeight: 600,
        margin: '8px 0 16px',
        textAlign: 'center',
    },
    hidden: {
        visibility: 'hidden',
    },
    srOnly: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
    },
}));

export default function SectionTitle(props) {
    const classes = useStyles();
    const {
        level = 'h2',
        variant = 'h6',
        hidden = false,
        srOnly = false,
        className = '',
        children,
        ...rest
    } = props;

    const composedClass = [
        classes.root,
        hidden ? classes.hidden : '',
        srOnly ? classes.srOnly : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <Typography
            component={level}
            variant={variant}
            className={composedClass}
            aria-hidden={hidden || undefined}
            {...rest}
        >
            {children}
        </Typography>
    );
}
