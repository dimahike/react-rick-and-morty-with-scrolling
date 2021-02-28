import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

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
}));

const LocationsFilter = ({ filter }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  const onChangeNameFieldHandle = (e) => {
    setName(e.target.value);
    filter({
      value: e.target.value,
      type: 'name',
    });
  };

  const onChangeTypeFieldHandle = (e) => {
    setType(e.target.value);
    filter({
      value: e.target.value,
      type: 'type',
    });
  };

  const onChangeDimensionFieldHandle = (e) => {
    setDimension(e.target.value);
    filter({
      value: e.target.value,
      type: 'dimension',
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
            label="Enter location"
            placeholder="Find location... "
            multiline
            variant="outlined"
            value={name}
            onChange={onChangeNameFieldHandle}
          />
        </Box>
      </Box>
      <Box className={classes.input}>
        <Typography variant="h6" className={classes.leftGape}>
          Type :
        </Typography>
        <Box mt={2}>
          <TextField
            label="Enter species"
            placeholder="Find species... "
            multiline
            variant="outlined"
            value={type}
            onChange={onChangeTypeFieldHandle}
          />
        </Box>
      </Box>
      <Box className={classes.input}>
        <Typography variant="h6" className={classes.leftGape}>
          Dimension :
        </Typography>
        <Box mt={2}>
          <TextField
            label="Enter species"
            placeholder="Find species... "
            multiline
            variant="outlined"
            value={dimension}
            onChange={onChangeDimensionFieldHandle}
          />
        </Box>
      </Box>
    </>
  );
};

export default LocationsFilter;
