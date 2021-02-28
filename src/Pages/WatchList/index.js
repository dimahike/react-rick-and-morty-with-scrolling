import React, { useEffect } from 'react';
import { Box, Snackbar } from '@material-ui/core';

import Aside from '../../UI/Aside';
import DetailsSideBar from './components/DetailsSideBar';
import AdderToList from './components/AdderToList';
import WatchList from './components/WatchList';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const WatchListPage = () => {
  const [open, setOpen] = React.useState(false);
  const { episodes, error, changed } = useSelector((state) => state.watchList);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Aside>
        <DetailsSideBar episodes={episodes} changed={changed} />
      </Aside>
      <AdderToList />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error && error.message}
        </Alert>
      </Snackbar>

      <Box mb={1} ml={{ xs: 0, sm: 0, md: 4 }}>
        <WatchList episodes={episodes} />
      </Box>
    </>
  );
};

export default WatchListPage;
