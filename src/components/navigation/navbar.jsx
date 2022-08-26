import React from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Container
} from 'react-bootstrap';

export default function BasicNavbar() {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">myFlix Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Movies</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Directors
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Genres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



