import {Navbar, NavbarBrand, NavbarToggler,Collapse, Nav, NavItem, } from "reactstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Navbar/nav.css"
import {signOut} from "../../utils/auth"
const ResponsiveAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand className="me-auto">
          NSL
        </NavbarBrand>
        <NavbarToggler className="me-2" onClick={() => { setIsOpen(!isOpen) }}  />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <span style={{"cursor": "pointer", "color": "white"}}  onClick={()=> signOut(()=> {
                navigate("/");
              })}>Logout</span>
            </NavItem>
            <NavItem>
              <Link style={{"cursor": "pointer", "color": "white"}} to={"/home"}  >Home</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default ResponsiveAppBar;
