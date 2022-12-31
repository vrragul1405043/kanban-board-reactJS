import React from "react";
import { Navbar } from "react-bootstrap";
import "./Header.css"
function Header() {
  //Component for creating that navbar at the top
  return (
    <Navbar variant="dark" className="navbar-custom">
      <Navbar.Brand>Kanban Board</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
