import { Box, Divider, makeStyles, Typography } from '@material-ui/core';

import poster from '../images/poster.jpg';

const useStyles = makeStyles((theme) => ({
  leftGape: {
    marginLeft: '25px',
    marginTop: '20px',
    fontWeight: 700,
  },
  posterImage: {
    maxWidth: theme.spacing(30),
    top: 0,
  },
}));

const InfoSideBar = () => {
  const classes = useStyles();

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
      </Box>
    </>
  );
};

export default InfoSideBar;
