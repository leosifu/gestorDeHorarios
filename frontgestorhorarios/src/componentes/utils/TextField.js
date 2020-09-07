import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme =>({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {

    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EA7600"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      color: '#EA7600',
      borderColor: "#EA7600"
    }
  },
  formLabel: {
    '&.Mui-focused': {
      color: '#EA7600'
    }
  }
}));

const TextFieldColored = (props) => {

  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      InputLabelProps={{
        className: classes.formLabel
      }}
      {...props}
    />
  )
}

export default TextFieldColored;
