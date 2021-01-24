import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  secondaryButton: {
    backgroundColor: '#B1B1B1',
    color: '#FFF',
    '&:hover':{
      backgroundColor: '#394049',
      boxShadow: 'none',
    }
  }
}));

const SecondaryButton = ({onClick, title, }) => {
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.secondaryButton}>
      {title}
    </Button>
  )
}

export default SecondaryButton;
