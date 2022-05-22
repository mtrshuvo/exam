import React, { useState } from 'react';
import { useFormik } from 'formik';

const File = () => {
    const [file, setFile] = useState("")
    const formik = useFormik({
        initialValues: {
            img: null
        },

    });
    console.log(formik.values.img[0]);
  return (
    <div>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data" >
            <input type="file" name='images' 
            onChange={(e)=> formik.setValues({img:e.target.files[0]}) } 
            value={formik.values.img} />
            <button type="submit" >Upload</button>
        </form>
    </div>
  )
}

export default File