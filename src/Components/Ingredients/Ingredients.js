import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Aux/Aux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        boxSizing: "border-box",
        margin: "20px 0",
        display: "block",
        alignContent: "center"
    },
    card: {
        display: "inline-block",
        paddingTop: "5px",
        paddingBottom: "25px",
        paddingLeft: "50px",
        paddingRight: "50px"
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    verticalDivider: {
        width: 2,
        height: "100%",
        margin: "0 50px",
        boxSizing: "border-box",
        border: "1px solid black"
    }
}));

export default function Ingredients(props) {
    const classes = useStyles();

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box className={classes.root} alignContent="center">
            <Card raised className={classes.card}>
                {props.title ?
                    <DialogTitle>{props.title}</DialogTitle>
                  : null}
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Typography className={classes.sectionTitle} type='subtitle2'>
                            Total Ingredients
                        </Typography>
                        {props.totalIngredients? props.totalIngredients: null}
                    </Grid>
                    {props.panIngredients.length > 1?
                        <Aux>
                            {matches ?   
                                <Grid item>
                                    <div className={classes.verticalDivider}></div>
                                </Grid>: null
                            }
                            <Grid item>
                                <Typography className={classes.sectionTitle} type='subtitle2'>
                                    Dough for pan
                                </Typography>
                                {props.panIngredients}
                            </Grid>
                        </Aux>:null
                    }
                </Grid> 
            </Card>
        </Box>
    );
}
