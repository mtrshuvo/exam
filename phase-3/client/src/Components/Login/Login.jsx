import React, {useState} from 'react'
import { useFormik } from 'formik';
import { login } from '../../api/auth';
import {useNavigate, Link} from "react-router-dom";
import { authenticate, isAuthenticated } from '../../utils/auth';
import {showError} from "../../utils/messages"
const Login = () => {
    const [response, setResponse] = useState({
        success:"",
        err: false,
        loading: false,
    });
    const navigate = useNavigate();

const {err, success} = response
    const formik = useFormik({
        initialValues: {
            nslId: "",
            password: "",
        },
        validate: values => {
            const errors = {};
            if (!values.nslId) {
              errors.nslId = 'Required';
            } else if (values.nslId.length < 3) {
              errors.nslId = 'Must be 3 characters';
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
            login({...values}).then(data=> {
              authenticate(data.data.token, ()=> {
                navigate("/home");
                return;
                console.log(data.data.token);
                navigate("/home")
              })
                formik.setSubmitting(false)
                return;

            }).catch(err => {
            //   notify(err.data)
            console.log(err);
                setResponse({...response, err:true});
                return;
            })
        },
  
        
        
    })

  return (
    <div className="registration-form">
      <div>{showError(err, "Login Failed")}</div>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-icon">
                <span>Login</span>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="nslId" placeholder="user id" 
                name='nslId'
                value={formik.values.nslId}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {formik.touched.nslId && formik.errors.nslId ? <span>{formik.errors.nslId}</span> : null}
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
                disabled={!(formik.isValid && formik.dirty)}
                 className="btn btn-block create-account">Login</button>
            </div>
        </form>
     </div>
  )
}

export default Login