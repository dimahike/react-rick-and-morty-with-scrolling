import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { episodeList } from '../../reducer/actions/episodeActions';
import Aside from '../../UI/Aside';
import TableUI from '../../UI/TableUI';
import EpisodesFilter from './components/EpisodesFilter';

const EpisodesPage = () => {
  const dispatch = useDispatch();

  const { loading, info, episodes, error } = useSelector((state) => state.episodeList);
  const [nameFilter, setNameFilter] = useState('');
  const [SeasonFilter, setSeasonFilter] = useState('');

  const filterHandler = (filter) => {
    switch (filter.type) {
      case 'name':
        return setNameFilter(filter.value);
      case 'season':
        return setSeasonFilter(filter.value);

      default:
        return '';
    }
  };

  const fetchMore = () => {
    console.log('fetch');
    dispatch(episodeList(nameFilter, SeasonFilter));
  };

  useEffect(() => {
    dispatch(episodeList(nameFilter, SeasonFilter, true));
  }, [dispatch, nameFilter, SeasonFilter]);

  return (
    <>
      <Aside>
        <EpisodesFilter filter={filterHandler} />
      </Aside>
      <Box>
        <Box display="flex" justifyContent="start" mb={1} ml={4}>
          <Typography variant="h5"> Episodes ({info?.count ? info.count : 0}) :</Typography>
        </Box>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : (
          <TableUI fetchMore={fetchMore} info={info} rows={episodes} episode={true} />
        )}
      </Box>
    </>
  );
};

export default EpisodesPage;
