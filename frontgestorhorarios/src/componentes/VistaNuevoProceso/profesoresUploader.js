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
      // console.log(status);
      // let formData = new FormData();
      // formData.append('file', file);
      // formData.append('procesoId', 1)
      setUploadFile(file);
    }
    // axios.post(`http://localhost:8000/api/profesores`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  return (

    <Dropzone
      onChangeStatus={handleChangeStatus}
      inputContent="Subir listado de profesores"
      maxFiles={1}
    />
  )
}

export default ProfesoresUploader;
