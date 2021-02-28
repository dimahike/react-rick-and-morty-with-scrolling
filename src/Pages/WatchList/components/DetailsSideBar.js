import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import TvIcon from '@material-ui/icons/Tv';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import React, { useEffect, useState } from 'react';

import poster from '../../../images/poster.jpg';

const useStyles = makeStyles((theme) => ({
  leftGape: {
    marginLeft: '25px',
    marginTop: '20px',
    fontWeight: 700,
  },
  input: {
    padding: '20px 25px',
  },
  uppercase: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
  },
  posterImage: {
    maxWidth: theme.spacing(30),
    top: 0,
  },
}));

const DetailsSideBar = ({ episodes, changed }) => {
  const classes = useStyles();

  const [watched, setWatched] = useState(0);
  const [noWatched, setNoWatched] = useState(0);

  useEffect(() => {
    let watchedCounter = 0;

    for (var i = 0; i < episodes.length; i++) {
      if (episodes[i].watched) {
        watchedCounter += 1;
      }
    }

    setWatched(watchedCounter);
    let noWatchedCounter = episodes.length - watchedCounter;
    setNoWatched(noWatchedCounter);
  }, [episodes, changed]);

  return (
    <>
      <Box>
        <Box mb={2}>
          <img src={poster} alt="Rick And Morty" className={classes.posterImage} />
          <Typography variant="h6" className={classes.leftGape}>
            Rick And Morty
          </Typography>
          <Typography variant="subtitle1" className={classes.leftGape}>
            Seeasons: 4
          </Typography>
          <Typography variant="subtitle1" className={classes.leftGape}>
            Episodes: 41
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h6" className={classes.leftGape}>
          Details :
        </Typography>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TvIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Watched"
              secondary={`${watched} ${watched === 1 ? 'Episode' : 'Episodes'} `}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <QueuePlayNextIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Wish To Watch"
              secondary={`${noWatched} ${watched === 1 ? 'Episode' : 'Episodes'}`}
            />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default DetailsSideBar;
