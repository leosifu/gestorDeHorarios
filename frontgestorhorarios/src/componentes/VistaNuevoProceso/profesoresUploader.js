import React, {useCallback} from 'react';

import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const ProfesoresUploader = ({uploadFile, setUploadFile, }) => {

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'removed') {
      setUploadFile(null);
    }
    else {
      setUploadFile(file);
    }
  }

  return (

    <Dropzone
      style={{maxWidth: 500}}
      onChangeStatus={handleChangeStatus}
      inputContent="Subir listado de profesores"
      maxFiles={1}
    />
  )
}

export default ProfesoresUploader;
