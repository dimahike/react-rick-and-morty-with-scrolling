import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { characterDetails } from '../../reducer/actions/characterActtions';

import Aside from '../../UI/Aside';
import InfoSideBar from '../../UI/InfoSideBar';
const CharacterDetails = (props) => {
  const characterId = props.match.params.id;
  const dispatch = useDispatch();

  const { loading, character, error } = useSelector((state) => state.characterDetails);

  useEffect(() => {
    dispatch(characterDetails(characterId));
  }, [dispatch, characterId]);

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
            <Box display="flex" justifyContent="start" flexWrap="wrap">
              <Box>
                <img src={character.image} alt={character.image} />
              </Box>
              <Box m={3}>
                <Typography variant="body1">
                  Name: <em>{character.name}</em>
                </Typography>
                <Typography variant="body1">
                  Status: <em>{character.status}</em>
                </Typography>
                <Typography variant="body1">
                  Species: <em>{character.species}</em>
                </Typography>
                {character?.type && (
                  <Typography variant="body1">
                    Type: <em>{character.type}</em>
                  </Typography>
                )}
                <Typography variant="body1">
                  Gender: <em>{character.gender}</em>
                </Typography>
                <Box m={2} />

                <Typography variant="body1">
                  Original from: <em>{character.origin.name}</em>
                </Typography>
                <Typography variant="body1">
                  Last Location: <em>{character.location.name}</em>
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <Box mb={1} pl={2}>
                <Typography variant="h5">Appeared in :</Typography>
              </Box>
              <Grid container>
                {character.episode.map((episodeNum, index) => {
                  const findEpisodeNum = episodeNum.split('/');
                  const numEpisode = findEpisodeNum[findEpisodeNum.length - 1];
                  return (
                    <Grid item key={`${numEpisode}_index_${index}`} xs={6} sm={4} md={3}>
                      <Box mt={1}>
                        <Link to={`/episode/${numEpisode}`}>
                          <Typography variant="body2">Episode {numEpisode}</Typography>
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

export default CharacterDetails;
