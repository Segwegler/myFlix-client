import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import { Link } from 'react-router-dom';

export default function MyNavBar(props){

  const home = () => {
    props.home();
  }

  const openLogin =(e) => {
    //props.setLoginPrompt(e);
    window.open('/login','_self');
  }

  const openReg = (e) => {
    //props.goToReg(e);
    window.open('/register','_self');
  }

  const logout = () => {
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
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >Genres</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >Directors</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              { props.user
                  ?<Nav.Link href={`/user`}>{props.user}</Nav.Link>
                  :<Nav.Link href='/login'>Login</Nav.Link>
              }
            </Nav.Item>
            <Nav.Item>
              {props.user
                  ? <Nav.Link onClick = {() => logout()}>logout</Nav.Link>
                  : <Nav.Link href='/register'>Register</Nav.Link>
              }
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
