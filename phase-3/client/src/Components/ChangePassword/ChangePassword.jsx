import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changePasswod, updateUser } from "../../api/auth";
import { Form, FormGroup, Label ,Input, Button } from "reactstrap";
import { userInfo } from "../../utils/auth";

const ChangePassword = () => {
    const param = useParams()
    const navigate = useNavigate();
    const {name, nslId} = userInfo()
  const [user, setUser] = useState({
    password: "",
  });
  const { password} =user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    changePasswod({ nslId, password }, userInfo().token)
      .then((data) => {
          console.log(data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form onSubmit={handlesubmit}>
      <FormGroup>
        <Label for="">Nsl Id</Label>
        <Input
          id=""
          name="nslId"
          placeholder="with a placeholder"
          type="text"
          value={nslId}
          required
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="">Name</Label>
        <Input
          id=""
          name="name"
          placeholder=""
          type="text"
          required
          onChange={handleChange}
          value={name}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="password placeholder"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ChangePassword;
