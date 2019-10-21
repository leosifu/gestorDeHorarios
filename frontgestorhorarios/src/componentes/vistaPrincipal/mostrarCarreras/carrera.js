import React, {useState} from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Mallas from './mallas'
import CrearMalla from '../formularios/formMalla/crearMalla'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    marginBottom:10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Carrera({title, mallas, carreraId, estado, setEstado}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [openM, setOpenM] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {title}
              </Grid>
              <Grid item xs={3}>
                <CrearMalla carreraId={carreraId} open={openM} setOpen={setOpenM} estado={estado} setEstado={setEstado}/>
                <Fab color="secondary" size="small" aria-label="edit" className={classes.margin}>
                  <EditIcon />
                </Fab>
              </Grid>
            </Grid>
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {mallas? <Mallas mallas={mallas}/>:<div/>}
      </Collapse>
    </Card>
  );
}
