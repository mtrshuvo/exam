import React, { useState } from 'react';
import "./signup.css";
import { useFormik } from 'formik';
import { register } from '../../api/auth';
import {useNavigate, Link} from "react-router-dom"
import {ToastContainer , toast} from "react-toastify"
import { notify } from '../../utils/Notifiaction';


const SignUp = () => {
    const [response, setResponse] = useState({
        success:"",
        err: "",
        loading: false,
    });
    const navigate = useNavigate();

    const {loading, err} = response;

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        validate: values => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Required';
            } else if (values.username.length < 3) {
              errors.username = 'Must be 3 characters';
            }
          
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 5) {
              errors.password = 'Password must be 5 char';
            }
            return errors;
        },
        onSubmit: ({...values}) => {
          formik.isSubmitting = true;
            setResponse({...response, loading: true, err: ""})
            register(values).then(data=> {
                setResponse({...response, loading: false, success: data.data});
                navigate("/");
                return;

            }).catch(err => {
              console.log(err);
              notify(err.data)
                setResponse({...response, loading: false, err: err.data});
                return;
            })
        },
        
        
    })


  return (
    <div className="registration-form">
        <form onSubmit={formik.handleSubmit}>
            <div className="form-icon">
                <span><Link style={{"textDecoration": "none"}} to="/">Login</Link></span>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="username" placeholder="Username" 
                name='username'
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {formik.touched.username && formik.errors.username ? <span>{formik.errors.username}</span> : null}
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="email" name='email'
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"/>
                {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}

            </div>
            <div className="form-group">
                <input type="password" className="form-control item" id="password" name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"/>
            { formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null}

            </div>
            
            <div className="form-group">
                <button type="submit" 
                disabled={!(formik.isValid && formik.dirty && !loading)} 
                className="btn btn-block create-account">Create Account</button>
            </div>
        </form>
     </div>
  )
}

export default SignUp