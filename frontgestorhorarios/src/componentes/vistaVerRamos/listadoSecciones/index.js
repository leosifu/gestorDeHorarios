import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 150,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListadoSecciones() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Nivel 4" />
        {open ? <ExpandLess /> : <ExpandMore />}
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
