import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};


function MyNavBar(props){

  const { user, onLoggedOut } = props

  const openLogin =(e) => {
    window.open('/login','_self');
  }

  const openReg = (e) => {
    window.open('/register','_self');
  }

  const logout = () => {
    onLoggedOut();
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item className="ml-auto">
              {("Username" in props.user)
                  ?<Nav.Link href={`/user`}>{props.user.Username}</Nav.Link>
                  :<Nav.Link href='/login'>Login</Nav.Link>
              }
            </Nav.Item>
            <Nav.Item>
              {("Username" in props.user)
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

export default connect(mapStateToProps)(MyNavBar);

MyNavBar.propTypes = {
  user:PropTypes.shape({
    FavoriteMovies: PropTypes.array,
    Birthday: PropTypes.string,
    Password: PropTypes.string,
    Username: PropTypes.string,
    _id: PropTypes.string,
    Email: PropTypes.string
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired
};
