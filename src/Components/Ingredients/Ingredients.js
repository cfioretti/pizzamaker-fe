import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SectionTitle from '../UI/SectionTitle/SectionTitle';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        boxSizing: 'border-box',
        margin: '20px auto',
        maxWidth: 720,
        padding: '0 16px',
    },
    card: {
        borderColor: theme.palette.brand.tealAqua,
        borderRadius: 8,
        padding: '20px 20px',
        [theme.breakpoints.up('sm')]: {
            padding: '32px 48px',
        },
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: 12,
        borderBottom: `2px solid ${theme.palette.brand.peach}`,
        marginTop: 8,
        marginBottom: 24,
    },
    totalLabel: {
        color: theme.palette.secondary.main,
        fontSize: '0.8125rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    totalValue: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.2,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.75rem',
        },
    },
    sectionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            gap: 48,
            alignItems: 'stretch',
        },
    },
    section: {
        flex: '1 1 0',
        minWidth: 0,
    },
    sectionsDivider: {
        backgroundColor: theme.palette.brand.peach,
        alignSelf: 'stretch',
        width: '100%',
        height: 1,
        border: 'none',
        margin: 0,
        [theme.breakpoints.up('sm')]: {
            width: 1,
            height: 'auto',
        },
    },
    eyebrow: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
        letterSpacing: '0.08em',
        display: 'block',
        marginBottom: 4,
        textAlign: 'left',
    },
    list: {
        margin: 0,
        padding: 0,
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '10px 0',
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    label: {
        color: theme.palette.text.primary,
        fontSize: '0.9375rem',
        margin: 0,
        flex: '1 1 auto',
        minWidth: 0,
        paddingRight: 12,
    },
    value: {
        color: theme.palette.secondary.main,
        fontSize: '0.9375rem',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        margin: 0,
        flexShrink: 0,
        textAlign: 'right',
    },
}));

function ItemList({ items, classes }) {
    return (
        <dl className={classes.list}>
            {items.map((item, i) => (
                <div className={classes.row} key={i}>
                    <dt className={classes.label}>{item.label}</dt>
                    <dd className={classes.value}>{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function Section({ title, items, classes }) {
    return (
        <div className={classes.section}>
            <Typography variant="overline" component="h3" className={classes.eyebrow}>
                {title}
            </Typography>
            <ItemList items={items} classes={classes}/>
        </div>
    );
}

export default function Ingredients(props) {
    const classes = useStyles();

    const hasItems = Array.isArray(props.items) && props.items.length > 0;
    const hasPanBreakdown = Array.isArray(props.panItems) && props.panItems.length > 1;

    return (
        <Box className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                {props.title ?
                    <SectionTitle level="h2" variant="h6">{props.title}</SectionTitle>
                  : null}

                {props.total ?
                    <div className={classes.totalRow}>
                        <span className={classes.totalLabel}>Total</span>
                        <span className={classes.totalValue}>{props.total}</span>
                    </div>
                  : null}

                <div className={classes.sectionsContainer}>
                    {hasItems ?
                        <Section title="Total ingredients" items={props.items} classes={classes}/>
                      : null}
                    {hasItems && hasPanBreakdown ?
                        <div className={classes.sectionsDivider} role="separator" aria-hidden="true"/>
                      : null}
                    {hasPanBreakdown ?
                        <Section title="Per pan" items={props.panItems} classes={classes}/>
                      : null}
                </div>
            </Card>
        </Box>
    );
}
