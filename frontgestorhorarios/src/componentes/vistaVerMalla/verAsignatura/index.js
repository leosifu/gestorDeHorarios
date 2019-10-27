import React, {useState} from 'react'

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import TabsAsignatura from './tabs'


const VerAsignatura = ({estado, setEstado, asignatura}) =>{

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(asignatura);

  return(
    <>
      <IconButton aria-label="settings" size='small' style={{padding:0}} onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        style={{height:630}}
      >
       <TabsAsignatura asignatura={asignatura}/>
      </Dialog>
    </>
  )
}
export default VerAsignatura
