import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles(theme => ({
  card: {
    width: 145,
    margin: 8,
    marginBottom: 13,
    height: 150
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
  title: {
    fontSize: 12,
  },
  oval:{
    m: 1,
    backgroundColor: '#E3E3E3',
    borderColor:'white',
    width: 100,
    height: 130,
    opacity:0.5
  },
  centrarIcon:{
    marginTop:'30%',
    marginLeft: '20%',
    color:'blue'
  },
  textoRamo:{
    
  }
}));

export default function Ramo() {
  const classes = useStyles();

  return (
    <>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" align="center">
          <Grid container>
            <Grid item xs={11}>
              Código: 1234
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="settings" size='small' style={{padding:0}}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Typography>
        <Typography align="center" alignItems="center" style={{fontSize:14, color: 'orange', height: '100%'}}>
          Ingles 1
        </Typography>
      </CardContent>
    </Card>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" align="center">
        <Grid container>
          <Grid item xs={11}>
            Código: 1234
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="settings" size='small' style={{padding:0}}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        </Typography>
        <Typography align="center" style={{fontSize:14, color: 'orange'}}>
          Ecuaciones Diferenciales y Metodos Numericos para Ingenieria
        </Typography>
      </CardContent>
    </Card>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" align="center">
          <Grid container>
            <Grid item xs={10}>
              Código: 1234
            </Grid>
            <Grid item xs={2}>
              <IconButton aria-label="settings" size='small'>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Typography>
        <Typography align="justify" style={{fontSize:12, color: 'orange'}}>
          ECUACIONES DIFERENCIALES Y METODOS NUMERICOS PARA INGENIERIA
        </Typography>
      </CardContent>
    </Card>
    <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" align="center">
        <Grid container>
          <Grid item xs={10}>
            Código: 1234
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="settings" size='small'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Typography>
      <Typography align="justify" style={{fontSize:12, color: 'orange'}}>
        ECUACIONES DIFERENCIALES Y METODOS NUMERICOS PARA INGENIERIA
      </Typography>
    </CardContent>
    </Card>
    <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" align="center">
        <Grid container>
          <Grid item xs={10}>
            Código: 1234
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="settings" size='small'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Typography>
      <Typography align="justify" style={{fontSize:12, color: 'orange'}}>
        ECUACIONES DIFERENCIALES Y METODOS NUMERICOS PARA INGENIERIA
      </Typography>
    </CardContent>
    </Card>
    <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" align="center">
        <Grid container>
          <Grid item xs={10}>
            Código: 1234
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="settings" size='small'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Typography>
      <Typography align="justify" style={{fontSize:12, color: 'orange'}}>
        ECUACIONES DIFERENCIALES Y METODOS NUMERICOS PARA INGENIERIA
      </Typography>
    </CardContent>
    </Card>
    <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" align="center">
        <Grid container>
          <Grid item xs={10}>
            Código: 1234
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="settings" size='small'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Typography>
      <Typography align="justify" style={{fontSize:12, color: 'orange'}}>
        ECUACIONES DIFERENCIALES Y METODOS NUMERICOS PARA INGENIERIA
      </Typography>
    </CardContent>
    </Card>
    <Card className={classes.card} style={{ display:'flex', justifyContent:'center' }}>
      <Box borderRadius="50%" border={1} className={classes.oval}>
        <IconButton className={classes.centrarIcon}>
          <AddCircleOutlineOutlinedIcon fontSize='large'/>
        </IconButton>
      </Box>
    </Card>
    </>
  );
}
