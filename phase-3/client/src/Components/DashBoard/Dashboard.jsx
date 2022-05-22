import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { userInfo } from "../../utils/auth";
import { getAllProjects, getAllReports } from "../../api/auth";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";
import { useForm } from "react-hook-form";

const Dashboard = () => {
    const { register, handleSubmit } = useForm();
  const { name, nslId, role } = userInfo();
  const [project, setProject] = useState([]);
  const [fi, setf] = useState([]);
  useEffect(() => {
    getAllProjects(userInfo().token)
      .then((data) => {
        const result = data.data.data;
        setProject(() => [...result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getAllReports(userInfo().token)
      .then((data) => {
        // setf([])
        setf(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:3001/api/reports/upload", {
        method: "POST",
        body: formData,
        
    },).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
};

  return (
    <div className="container-fluid">
      {role === "admin" || role === "teamlead" ? (
        <div className="col-md-6">
          <Link className="m-1" to={"/addproject"}>
            Add Project
          </Link>
          <Link style={{}} to={"/adduser"}>
            Add User
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{role}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-5">
            <h3 className="card-header">Reports</h3>
            <ul className="list-group">
              {fi &&
                fi.map((b) => (
                  <a
                    className="list-group-item"
                    target="_blank"
                    download
                    href={b.link}
                  >
                    {b._id}
                  </a>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="card mb-5">
          <h3 className="card-header">Project List</h3>
          <ul className="list-group">
            {project.map((p) => (
              <Link className="list-group-item" to={`/projects/${p._id}`}>
                {p.title}
              </Link>
            ))}
            {/* <li className="list-group-item">Title 1</li> */}
          </ul>
        </div>
      </div>
      </div>
      <div className="col-md-6">
        <div className="card mb-5">
            <h3>Upload File</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("file")} />
                <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
