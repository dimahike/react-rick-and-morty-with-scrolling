import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { episodeDetails } from '../../reducer/actions/episodeActions';

import Aside from '../../UI/Aside';
import InfoSideBar from '../../UI/InfoSideBar';

const EpisodeDetails = (props) => {
  const episodeId = props.match.params.id;
  const dispatch = useDispatch();

  const { loading, episode, error } = useSelector((state) => state.episodeDetails);
  console.log('episode', episode);

  const season = episode?.episode.slice(1, 3);
  const episodeFromSeason = episode?.episode.slice(-2);
  useEffect(() => {
    dispatch(episodeDetails(episodeId));
  }, [dispatch, episodeId]);

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
              <Typography variant="h6">Name: {episode.name}</Typography>
              <Typography variant="body2">Date Relies: {episode.air_date}</Typography>
              <Typography variant="body2">Total Number Of Episode : {episode.id}</Typography>
              <Typography variant="body2">Season: {season}</Typography>
              <Typography variant="body2">Episode: {episodeFromSeason}</Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1} pl={2}>
                <Typography variant="h5">
                  Appearently Characters in Episode {episode.id} :
                </Typography>
              </Box>
              <Grid container>
                {episode.characters.map((characterUrl, index) => {
                  const splitedCharacterUrl = characterUrl.split('/');
                  const characterId = splitedCharacterUrl[splitedCharacterUrl.length - 1];
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

export default EpisodeDetails;
