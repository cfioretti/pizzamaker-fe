import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
          display: "flex",
          padding: 20,
          margin: "auto",
          width: "100%",
          boxSizing: "border-box",
    }
}));

export default function Ingredients(props) {
    const classes = useStyles();

    return (
        <Box alignContent="center">
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <Typography type='subtitle1'>
                        Ingredienti Totali
                    </Typography>
                    {props.totalIngredients? props.totalIngredients: null}
                </Grid>
                {props.panIngredients.length > 1?
                    <Grid item>
                        <Typography type='subtitle1'>
                            Impasto per teglia
                        </Typography>
                        {props.panIngredients}
                    </Grid>:null
                }
            
            </Grid> 
        </Box>
    );
}