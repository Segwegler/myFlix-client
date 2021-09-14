import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

export default function LoginView(props) {

  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const [error, setError ] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://nsegler-myflixdb.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then( response => {
      props.onLoggedIn(response.data);
      props.onBackClick();
    }).catch( e => {
      console.log('user not found',e);
      setError(true);
    });
  };

    return(
      <Card className="mt-5">
        <Card.Body>
        <Card.Title>Login</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" onChange={ e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  onChange={e=> setPassword(e.target.value)}
                  isInvalid = {error}
                />
                <Form.Control.Feedback type="invalid">Username or Password is incorrect</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Row  className='mt-1 ml-2'>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Log in!</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
}
