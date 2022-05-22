import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { getAllMember, getsingleProjects, updateSingleProject } from "../../api/auth";
import { userInfo } from "../../utils/auth";

const SingleProjects = () => {
const {name, nslId, role, token} = userInfo();
  const params = useParams();
  const [mod, setMod] = useState(false);
  const [member, setMember] = useState();
  console.log(params);
  const [project, setProject] = useState({});

  useEffect(() => {
    getsingleProjects(userInfo().token, params.id)
      .then((data) => {
        console.log(data.data.data);
        setProject(data.data.data);
        console.log(project.teamLead.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
      getAllMember(token).then(data=> {
          const result = data?.data?.users;
          setMember(result);
      })
  },[])

  return (
    <div className="container-fluid">
      <div className="col-md-6">
        <div className="card mb-3">
          <h3 className="card-header">{project.title} Information</h3>
          <ul className="list-group">
            <li className="list-group-item">
              Team Lead: {project?.teamLead?.name}
            </li>
          </ul>
          <ul className="list-group">
            <h6>Members</h6>
               <li className="list-group-item">{project?.members?.name}</li>
          </ul>
        </div>
        {/* </div> */}
        <div className="card mb-5">
          <h3 className="card-header">Project Report</h3>
          <ul className="list-group">
            <li className="list-group-item">
              Team Lead: {project?.teamLead?.name}
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-3">
        <div>
            {role === "admin" || role === "teamLead"? (<>
                <Button color="danger" className="mb-1" onClick={()=> setMod(!mod)}>Upload Report</Button>
                <Button color="danger" onClick={()=> setMod(!mod)}>Add Member</Button>
                </>
            ): <Button color="danger" onClick={()=> setMod(!mod)}>Upload Report</Button>
        }

          <Modal isOpen={mod}>
            <ModalHeader toggle={()=> setMod(!mod)}>
              Modal title
            </ModalHeader>
            <ModalBody>
              <Form>
                  <Input type="file" />
                  
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setMod(!mod)}>
                Do Something
              </Button>{" "}
              <Button onClick={() => {setMod(!mod)}}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      <div className="col-md-3">
      <div className="card mb-2">
          <h3 className="card-header">Avilabel Member</h3>
          <ul className="list-group" style={{"display": "flex"}}>
            {member?.map(m => {
              return(<><li className="list-group-item" key={m?._id}>{m?.name}</li>
                <Button onClick={()=> {
                    updateSingleProject({member: [...project?.member._d, m._id]}, token, project?._id).then(data=> {
                        
                    }).catch(err=> {
                        console.log(err);
                    })
                }} style={{"display": "inline-block"}}>Add</Button></>)
            }
            )}
          </ul>
        </div>
        </div>
    </div>
  );
};

export default SingleProjects;
