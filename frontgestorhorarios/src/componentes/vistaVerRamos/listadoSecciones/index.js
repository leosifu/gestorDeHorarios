import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 150,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon:{
    color: 'blue',
    border: 1,
    m: 1,
    '&:hover': {
       backgroundColor: '#C8C6C6',
    },
  },
}));

export default function ListadoSecciones() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const unClick = () => {
    alert("hola")
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button>
        <ListItemText primary="Nivel 1" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Nivel 2" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Nivel 3" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Nivel 4" onClick={unClick}/>
        <Box className={classes.icon} borderRadius="50%" onClick={handleClick}>
          {open ? <ExpandLess  /> : <ExpandMore/>}
        </Box>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemText primary="EDA" />
        </ListItem>
        <ListItem button className={classes.nested}>
          <ListItemText primary="Paradigmas" />
        </ListItem>
        <ListItem button className={classes.nested}>
          <ListItemText primary="Análisis" />
        </ListItem>
      </List>
      </Collapse>
    </List>
  );
}
