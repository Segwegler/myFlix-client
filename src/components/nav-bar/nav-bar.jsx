import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export function MyNavBar(props){

  const home = () => {
    props.home();
  }

  const openLogin =(e) => {
    props.setLoginPrompt(e);
  }

  const openReg = (e) => {
    props.goToReg(e);
  }

  const logout = (e) => {
    props.onLoggedOut();
  }

  const goToUser = (e) => {
    //will go to a users profile
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>MyMDB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid">
            <Nav.Item>
              <Nav.Link onClick = {() => home()}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >Categorys</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >Directors</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              { props.user
                  ?<Nav.Link>{props.user}</Nav.Link>
                  :<Nav.Link onClick = {() => openLogin(true)}>Login</Nav.Link>
              }
            </Nav.Item>
            <Nav.Item>
              {props.user
                  ? <Nav.Link onClick = {() => logout(true)}>logout</Nav.Link>
                  : <Nav.Link onClick = {() => openReg(true)}>Register</Nav.Link>
              }
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
