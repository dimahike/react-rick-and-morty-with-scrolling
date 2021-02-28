import Header from './UI/Header';
import React from 'react';
import clsx from 'clsx';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EpisodesPage from './Pages/EpisodesPage';
import LocationsPage from './Pages/LocationsPage';
import WatchListPage from './Pages/WatchList';
import CharacterDetails from './Pages/CharacterDetails';
import { makeStyles } from '@material-ui/core';
import { drawerWidth } from './data';
import LocationDetails from './Pages/LocationDetails';
import EpisodeDetails from './Pages/EpisodeDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.spacing(30),
    marginTop: '100px',
    [theme.breakpoints.down('720')]: {
      marginLeft: 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    paddingTop: '15px',
  },
  aside: {
    width: drawerWidth,
    top: '100px',
    left: '15px',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <Header />
      </header>

      <main className={clsx(classes.content)}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/episodes" component={EpisodesPage} exact />
          <Route path="/locations" component={LocationsPage} exact />
          <Route path="/watchlist" component={WatchListPage} exact />
          <Route path="/character/:id" component={CharacterDetails} exact />
          <Route path="/episode/:id" component={EpisodeDetails} exact />
          <Route path="/location/:id" component={LocationDetails} exact />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
