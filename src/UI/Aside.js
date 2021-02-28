import React from 'react';
import { Box, makeStyles, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { drawer as drawerAction } from '../reducer/actions/headerActions';

const useStyles = makeStyles((theme) => ({
  drawer: {},
  aside: {
    width: theme.spacing(30),
    top: '100px',
    left: '15px',
  },
}));

const Aside = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(720));
  const drawer = useSelector((state) => state.drawer);

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(drawerAction(false));
  };
  return (
    <>
      {matches ? (
        <Box className={classes.filter}>
          <Box position={['block', 'absolute']} className={classes.aside}>
            {props.children}
          </Box>
        </Box>
      ) : (
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}>
          <Box className={classes.drawer}>{props.children}</Box>
        </SwipeableDrawer>
      )}
    </>
  );
};

export default Aside;
