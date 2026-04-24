import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
    background: `linear-gradient(180deg, ${theme.palette.primary.light} 33.33%, ${theme.palette.secondary.main} 33.33%, ${theme.palette.secondary.main} 66.67%, ${theme.palette.primary.light} 66.67%, ${theme.palette.primary.light} 100%, ${theme.palette.primary.light} 100%)`,
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

export default function MyAppBar() {
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
