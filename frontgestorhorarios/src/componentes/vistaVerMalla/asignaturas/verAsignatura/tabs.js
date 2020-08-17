import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListaCoord from '../../coordinaciones/listaCoord'
import InfoAsignatura from './infoAsignatura'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsAsignatura({infoAsignatura, asignatura, estado, setEstado, user,
  userRedux, currentProceso, estadoM, setEstadoM, }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered
          style={{backgroundColor:'orange'}}>
          <Tab label="Información" {...a11yProps(0)} />
          <Tab label="Coordinaciones" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <InfoAsignatura infoAsignatura={infoAsignatura} asignatura={asignatura} estado={estado}
          setEstado={setEstado} user={user} userRedux={userRedux} userRedux={userRedux}
          currentProceso={currentProceso} estadoM={estadoM} setEstadoM={setEstadoM}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListaCoord asignatura={asignatura} infoAsignatura={infoAsignatura} estado={estado}
          setEstado={setEstado} userRedux={userRedux} coordinaciones={asignatura.coordinaciones}
          lab_independiente={asignatura.lab_independiente} user={user}
          currentProceso={currentProceso}/>
      </TabPanel>
    </div>
  );
}
