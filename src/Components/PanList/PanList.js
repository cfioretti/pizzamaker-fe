import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PanItem from './PanItem/PanItem';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    padding: 20,
    margin: "auto",
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function SpacingGrid(props) {
  const classes = useStyles();
  const selectedPans = props.selectedPans;

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid key={-1} item xs={12} sm="auto">
        <PanItem onClick={props.addHandler} create/>
      </Grid>
      {props.pans.map((pan, index) => (
          <Grid key={index} item xs={12} sm="auto">
            <PanItem key={index} selected={selectedPans.includes(index)} selectHandler={() => props.selectHandler(index)}
                     shape={pan.shape} dimensions={pan.measures}/>
          </Grid>
      ))}
    </Grid>
  );
}
