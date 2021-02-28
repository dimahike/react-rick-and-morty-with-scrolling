import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 240,
    height: 350,
  },
  media: {
    height: 220,
  },
});
const CardUI = ({ character }) => {
  const classes = useStyles();
  const history = useHistory();

  const onClickHandle = () => {
    history.push(`/character/${character.id}`);
  };

  return (
    <Card className={classes.root} onClick={onClickHandle}>
      <CardActionArea>
        <CardMedia className={classes.media} image={character.image} title={character.name} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {character.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Species: {character.species}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Status: {character.status}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Gender: {character.gender}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardUI;
