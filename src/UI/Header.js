import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import TvIcon from '@material-ui/icons/Tv';
import ExploreIcon from '@material-ui/icons/Explore';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { useDispatch } from 'react-redux';
import { drawer } from '../reducer/actions/headerActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  button: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    textDecoration: 'none',
  },

  title: {
    flexGrow: 1,
    color: theme.palette.warning.light,
    textDecoration: 'none',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: theme.spacing(30),
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.spacing(30),
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up(720));

  useEffect(() => {
    dispatch(drawer(false));
  }, [dispatch]);

  const handleDrawerOpen = () => {
    dispatch(drawer(true));
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          {!matches && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}>
              <FilterListIcon />
            </IconButton>
          )}
          <Link to="/" className={clsx(classes.title)}>
            <Typography variant="h6">R&M</Typography>
          </Link>

          {matches ? (
            <>
              <Link to="/" className={classes.button}>
                <Button color="inherit">CHARACTERS</Button>
              </Link>
              <Link to="/episodes" className={classes.button}>
                <Button color="inherit">EPISODES</Button>
              </Link>
              <Link to="/locations" className={classes.button}>
                <Button color="inherit">LOCATIONS</Button>
              </Link>
              <Link to="/watchlist" className={classes.button}>
                <Button color="inherit">WATCH LIST</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <IconButton className={classes.button}>
                  <i className="fas fa-user-astronaut"></i>
                </IconButton>
              </Link>
              <Link to="/episodes">
                <IconButton className={classes.button}>
                  <TvIcon />
                </IconButton>
              </Link>
              <Link to="/locations">
                <IconButton className={classes.button}>
                  <ExploreIcon />
                </IconButton>
              </Link>
              <Link to="/watchlist">
                <IconButton className={classes.button}>
                  <QueuePlayNextIcon />
                </IconButton>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
