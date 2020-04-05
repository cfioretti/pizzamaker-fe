import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PanItem from './PanItem/PanItem';    

const useStyles = makeStyles(theme => ({
  root: {
        display: "flex",
        padding: 20,
        width: "100%",
        margin: 20,
        boxSizing: "border-box",
        alignContent: "center"
  },
  icon: {
        width: 100,
        height: 100,
        paddingTop: 10
  }
}));

export default function SpacingGrid(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      <Grid item>
          <PanItem onClick={props.addHandler} create/>
      </Grid>
      {props.pans.map((pan, index) => (
          <Grid key={index} item>
              <PanItem key={index} shape={pan.type} dimensions={pan.dimensions}/>
          </Grid>
      ))}
    </Grid>
  );
}
