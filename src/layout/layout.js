import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import App from '../App';
import Navbar from '../components/shared/navbar';
import { blueGrey, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    color: blueGrey[800],
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  /* adds a minimum height to an element */
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: grey[100],
    padding: theme.spacing(3, 15), // default value for spacing are 8px
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 3),
    },
  },
}));

const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <App />
      </div>
    </div>
  );
};

export default Layout;
