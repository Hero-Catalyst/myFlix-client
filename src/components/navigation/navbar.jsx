import React from 'react';
import {
  Nav,
  Navbar,
  Container,
  Button
} from 'react-bootstrap';
import NavbarOffcanvas from 'react-bootstrap/esm/NavbarOffcanvas';

export function Menubar({ user }) {

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };


  return (

    <Navbar className="main-nav" sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFlixCinema</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                this.onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Sign-in</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Sign-up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}




