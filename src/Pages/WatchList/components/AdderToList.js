import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  NativeSelect,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { episodeList } from '../../../reducer/actions/episodeActions';
import { addToWatchList } from '../../../reducer/actions/watchListActions';

const AdderToList = () => {
  const dispatch = useDispatch();

  const [selector, setSelector] = useState(1);

  const { loading, info, episodes, error } = useSelector((state) => state.episodeList);

  const selectorHandler = (e) => {
    setSelector(e.target.value);
  };

  const onClickButtonHandler = () => {
    dispatch(addToWatchList(selector));
  };

  useEffect(() => {
    dispatch(episodeList());
  }, [dispatch]);

  return (
    <Box mb={5} ml={{ xs: 0, sm: 4 }}>
      <Box>
        <Typography variant="h6"> Add TV-Episode to Wish List :</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3} mb={4}>
        <Box mx={{ xs: 1, sm: 2 }} my={{ xs: 3 }}>
          <Typography variant="h6">Choose </Typography>
        </Box>
        <Box mx={{ xs: 1, sm: 2 }} my={{ xs: 3 }}>
          <FormControl>
            {loading ? (
              <Typography variant="h6">Loading List Episodes</Typography>
            ) : error ? (
              <Typography variant="h6">Not found</Typography>
            ) : (
              <NativeSelect name="episode" onChange={selectorHandler}>
                {Array.from(Array(info.count).keys()).map((episodeIndex) => (
                  <option key={`episode_${episodeIndex + 1}`} value={episodeIndex + 1}>
                    Episode {episodeIndex + 1}
                  </option>
                ))}
              </NativeSelect>
            )}

            <FormHelperText>Choose an episode</FormHelperText>
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center" mx={2}>
          <Button
            onClick={onClickButtonHandler}
            variant="contained"
            color="primary"
            disabled={!episodes ? true : false}>
            add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdderToList;
