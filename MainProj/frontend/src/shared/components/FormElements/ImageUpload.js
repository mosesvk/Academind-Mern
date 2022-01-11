import React, {useRef} from 'react';

import Button from './Button'
import './ImageUpload.css';

const ImageUpload = (props) => {
  const filePickerRef = useRef()

  const pickHandler = (event) => {
    console.log(event.target)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click();

  }

  return (
    <div className='form-control'>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          <img src='' alt='preview'/>
        </div>
        <Button type='button' onClick={pickImageHandler}>Pick Image</Button>
      </div>
    </div>
  );
};

export default ImageUpload;
