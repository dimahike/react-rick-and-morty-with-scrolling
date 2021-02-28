import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';

import { seasons } from '../../../data.js';

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
  active: {
    fontWeight: 900,
  },
}));

const EpisodesFilter = ({ filter }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [season, setSeason] = useState(0);

  const onChangeNameFieldHandle = (e) => {
    setName(e.target.value);
    filter({
      value: e.target.value,
      type: 'name',
    });
  };

  const onClickSeasonHandle = (index) => {
    setSeason(index);

    filter({
      value: index,
      type: 'season',
    });
  };

  return (
    <>
      <Box className={classes.input}>
        <Typography variant="h6" className={classes.leftGape}>
          Name :
        </Typography>
        <Box mt={2}>
          <TextField
            label="Enter species"
            placeholder="Find species... "
            multiline
            variant="outlined"
            value={name}
            onChange={onChangeNameFieldHandle}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" className={classes.leftGape}>
          Seasons :
        </Typography>
        <List>
          {seasons.map((seasonFilter, index) => (
            <ListItem button key={seasonFilter} onClick={() => onClickSeasonHandle(index)}>
              <ListItemText className={classes.uppercase}>
                <Typography
                  variant="subtitle2"
                  className={clsx(seasons[season] === seasonFilter && classes.active)}>
                  {seasonFilter}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* <Box className={classes.input}>
       
        <Typography variant="h6" className={classes.leftGape}>
          Episodes :
        </Typography>
        <Box mt={2}>
          <FormControl>
            <NativeSelect
              // value={state.age}
              // onChange={handleChange}
              name="age"
              // className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'age' }}>
              {}
              <option value={0}>All</option>
              <option value={1}>Episod 1</option>
              <option value={2}>Episod 2</option>
              <option value={3}>Episod 3</option>
              <option value={4}>Episod 4</option>
            </NativeSelect>
            <FormHelperText>With visually hidden label</FormHelperText>
          </FormControl>
        </Box>
      </Box> */}
    </>
  );
};

export default EpisodesFilter;
