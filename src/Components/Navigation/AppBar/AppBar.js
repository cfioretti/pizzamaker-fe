import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    background: 'linear-gradient(180deg, #2c8d93 33.33%, #223b59 33.33%, #223b59 66.67%, #2c8d93 66.67%, #2c8d93 100%, #2c8d93 100%)',
    height: 100,
  },
  toolbar: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: 0,
    padding: 0
  },
  logo: {
    height: 100,
    verticalAlign: "middle",
  }
}));

export default function MyAppBar(props) {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar className={classes.navBar} position="static">
        <Toolbar className={classes.toolbar}>
          <img className={classes.logo} src="/logo-extended.png" alt="Pizza Maker"/>
        </Toolbar>
      </AppBar>
    </header>
  );
}