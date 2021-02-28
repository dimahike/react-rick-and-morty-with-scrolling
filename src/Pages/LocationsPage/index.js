import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { locationList } from '../../reducer/actions/locationActions';
import Aside from '../../UI/Aside';
import TableUI from '../../UI/TableUI';
import LocationsFilter from './components/LocationsFilter';

const LocationsPage = () => {
  const dispatch = useDispatch();

  const { loading, locations, info, error } = useSelector((state) => state.locationList);

  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dimensionFilter, setDimension] = useState('');

  const filterHandler = (filter) => {
    switch (filter.type) {
      case 'name':
        return setNameFilter(filter.value);
      case 'type':
        return setTypeFilter(filter.value);
      case 'dimension':
        return setDimension(filter.value);

      default:
        return '';
    }
  };

  const fetchMore = () => {
    console.log('fetch');
    dispatch(locationList(nameFilter, typeFilter, dimensionFilter));
  };

  useEffect(() => {
    dispatch(locationList(nameFilter, typeFilter, dimensionFilter, true));
  }, [dispatch, nameFilter, typeFilter, dimensionFilter]);

  return (
    <>
      <Aside>
        <LocationsFilter filter={filterHandler} />
      </Aside>
      <Box>
        <Box display="flex" justifyContent="start" mb={1} ml={4}>
          <Typography variant="h5">Locations ({info?.count ? info.count : 0}) :</Typography>
        </Box>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : (
          <TableUI fetchMore={fetchMore} info={info} rows={locations} location={true} />
        )}
      </Box>
    </>
  );
};

export default LocationsPage;
