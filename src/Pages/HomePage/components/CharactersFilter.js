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
import { genders, statuses } from '../../../data';

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

const CharactersFilter = ({ filter }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('any');
  const [gender, setGender] = useState('any');

  const onChangeNameFieldHandle = (e) => {
    setName(e.target.value);
    filter({
      value: e.target.value,
      type: 'name',
    });
  };

  const onChangeSpeciesFieldHandle = (e) => {
    setSpecies(e.target.value);
    filter({
      value: e.target.value,
      type: 'species',
    });
  };

  const onClickStatusHandle = (value) => {
    setStatus(value);
    if (value === 'any') {
      filter({
        value: '',
        type: 'status',
      });
    } else {
      filter({
        value: value,
        type: 'status',
      });
    }
  };

  const onClickGenderHandle = (value) => {
    setGender(value);
    if (value === 'any') {
      filter({
        value: '',
        type: 'gender',
      });
    } else {
      filter({
        value: value,
        type: 'gender',
      });
    }
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
      <Box className={classes.input}>
        <Typography variant="h6" className={classes.leftGape}>
          Species :
        </Typography>
        <Box mt={2}>
          <TextField
            label="Enter species"
            placeholder="Find species... "
            multiline
            variant="outlined"
            value={species}
            onChange={onChangeSpeciesFieldHandle}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" className={classes.leftGape}>
          Status :
        </Typography>
        <List>
          {statuses.map((statusFilter) => (
            <ListItem button key={statusFilter} onClick={(e) => onClickStatusHandle(statusFilter)}>
              <ListItemText className={classes.uppercase}>
                <Typography
                  variant="subtitle2"
                  className={clsx(status === statusFilter && classes.active)}>
                  {statusFilter}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Typography variant="h6" className={classes.leftGape}>
          Gender :
        </Typography>
        <List>
          {genders.map((genderFilter) => (
            <ListItem button key={genderFilter} onClick={(e) => onClickGenderHandle(genderFilter)}>
              <ListItemText className={clsx(classes.uppercase)}>
                <Typography
                  variant="subtitle2"
                  className={clsx(gender === genderFilter && classes.active)}>
                  {genderFilter}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default CharactersFilter;
