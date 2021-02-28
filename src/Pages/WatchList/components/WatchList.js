import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import {
  checkBoxWatcheList,
  clearWatchList,
  removeEpisodeFromWatchList,
} from '../../../reducer/actions/watchListActions';

const useStyles = makeStyles((theme) => ({
  headTable: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingInlineStart: theme.spacing(1),
    color: theme.palette.common.white,
  },
  bodyTable: {
    borderBottom: '1px solid black',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const WatchList = ({ episodes }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const dispatch = useDispatch();

  const cheackBoxHandler = (episodeId) => {
    dispatch(checkBoxWatcheList(episodeId));
  };

  const removeEpisodeHandler = (episodeId) => {
    dispatch(removeEpisodeFromWatchList(episodeId));
  };

  const clearWatchListHandler = () => {
    if (window.confirm('Are You Sure?')) {
      dispatch(clearWatchList());
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5"> Watch List ({episodes.length}) :</Typography>
      </Box>

      {episodes.length > 0 ? (
        <Box mt={2}>
          <Box display={{ xs: 'none', sm: 'block' }} bgcolor="primary.light">
            <Grid container>
              <Grid item xs={2} className={classes.headTable}>
                <Typography variant="body2">Watched</Typography>
              </Grid>
              <Grid item xs={3} className={classes.headTable}>
                <Typography variant="body2">Episode</Typography>
              </Grid>
              <Grid item xs={5} className={classes.headTable}>
                <Typography variant="body2">Name</Typography>
              </Grid>
              <Grid item xs={2} className={classes.headTable}>
                <Typography variant="body2">Ation</Typography>
              </Grid>
            </Grid>
          </Box>
          {episodes.map((watchEpisode) => (
            <Grid
              key={watchEpisode.id}
              container
              direction="row"
              alignItems="center"
              className={classes.bodyTable}>
              <Grid item xs={12} sm={2}>
                <Box p={2} display={{ xs: 'flex', sm: 'block' }} justifyContent="center">
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={watchEpisode.watched ?? false}
                        onChange={() => cheackBoxHandler(watchEpisode.id)}
                        name="watchedCheackBox"
                      />
                    }
                    label={matches ? '' : 'Watched'}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box p={2} display={{ xs: 'flex', sm: 'block' }} justifyContent="center">
                  <Box display={{ xs: 'block', sm: 'none' }} mr={2} color="primary.dark">
                    <Typography variant="h6">Episode :</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">{watchEpisode.id}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box p={2} display={{ xs: 'flex', sm: 'block' }} justifyContent="center">
                  <Box display={{ xs: 'block', sm: 'none' }} mr={2} color="primary.dark">
                    <Typography variant="h6">Name :</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">{watchEpisode.name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Box p={2} display={{ xs: 'flex', sm: 'block' }} justifyContent="center">
                  <Box display={{ xs: 'block', sm: 'none' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeEpisodeHandler(watchEpisode.id)}>
                      remove
                    </Button>
                  </Box>
                  <Box display={{ xs: 'none', sm: 'block' }}>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => removeEpisodeHandler(watchEpisode.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))}
          <Box display="flex" my={4} justifyContent="flex-end">
            <Button variant="contained" color="secondary" onClick={clearWatchListHandler}>
              CLEAN WATCH LIST
            </Button>
          </Box>
        </Box>
      ) : (
        <Box mt={3}>
          <Alert severity="info"> Not Found Episodes In Watch List </Alert>
        </Box>
      )}
    </Box>
  );
};

export default WatchList;
