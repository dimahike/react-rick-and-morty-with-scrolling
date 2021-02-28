import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { locationDetails } from '../../reducer/actions/locationActions';

import Aside from '../../UI/Aside';
import InfoSideBar from '../../UI/InfoSideBar';

const LocationDetails = (props) => {
  const locationId = props.match.params.id;
  const dispatch = useDispatch();

  const { loading, location, error } = useSelector((state) => state.locationDetails);
  console.log('location', location);

  useEffect(() => {
    dispatch(locationDetails(locationId));
  }, [dispatch, locationId]);

  return (
    <>
      <Aside>
        <InfoSideBar />
      </Aside>

      <Box display="flex" justifyContent="center" m={3}>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : (
          <Box>
            <Box>
              <Typography variant="h6">Name: {location.name}</Typography>
              <Typography variant="body2">Type: {location.type}</Typography>
              <Typography variant="body2">Dimension : {location.dimension}</Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1} pl={2}>
                <Typography variant="h5">Appearently Characters om {location.name} :</Typography>
              </Box>
              <Grid container>
                {location.residents.map((residentUrl, index) => {
                  const splitedresidentUrl = residentUrl.split('/');
                  const characterId = splitedresidentUrl[splitedresidentUrl.length - 1];
                  return (
                    <Grid item key={`${characterId}_index_${index}`} xs={6} sm={4} md={3}>
                      <Box mt={1}>
                        <Link to={`/character/${characterId}`}>
                          <Typography variant="body2">Character {characterId}</Typography>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LocationDetails;
