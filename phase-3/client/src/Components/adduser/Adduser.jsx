import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FormGroup, Form, Input, Label, Button} from "reactstrap"
import { createUser } from '../../api/auth'
import { userInfo } from '../../utils/auth'
import {showError} from"../../utils/messages"
const roles = ["user","teamLead"]
const Adduser = () => {
  const [response, setResponse] = useState({
    success:"",
    err: false,
    loading: false,
});
    const navigate = useNavigate()
    const {err, success} = response

    const [user, setUser] = useState({
      nslId: "",
      name: "",
    });

    const handleChange = (e)=> {
      setResponse({...response, err:false});

      setUser({
        ...user,
        [e.target.name] : e.target.value,
      })
    }
    
  const {nslId, name} = user;

  const handlesubmit= (e)=>{
    e.preventDefault();
    setResponse({...response, loading: true, err: ""})

  createUser({...user}, userInfo().token).then(data=> {
    navigate("/home")
  }).catch(err=> {
    setResponse({...response, err:true});
    console.log(err);
  })
  }

  return (
    <div className="col-md-6 m-auto">
            <div>{showError(err, "User creation Failed")}</div>

    <Form className='mb-1' onSubmit={handlesubmit}>
      <FormGroup>
        <Label for="text">NSL ID</Label>
        <Input
          id="nsid"
          name="nslId"
          placeholder="10001"
          type="text"
          value={nslId}
          required
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Name</Label>
        <Input
          id="title"
          name="name"
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={handleChange}

        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Role</Label>
          <select className='form-control' name="role" id="" onChange={handleChange} >
            {roles && roles.map(m=> {
              return (<option key={m?._id} value={m}>{m}</option>);
            })}
          </select>
      </FormGroup>
      <Button  type='submit'>Submit</Button>
    </Form>
    <Button type="button" onClick={()=> {
      navigate(-1)
    }} >GO Back</Button>
    </div>
  )
}

export default Adduser