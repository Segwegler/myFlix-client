import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

export default function LoginView(props) {

  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://nsegler-myflixdb.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then( response => {
      const data = response.data;
      props.onLoggedIn(data);
      props.onBackClick()
    }).catch( e => {
      console.log('user not found');
    });
  };

    return(
      <Card className="mt-5">
        <Card.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" onChange={ e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" onChange={e=> setPassword(e.target.value)} />
            </Form.Group>
            <Row  className='mt-1 ml-2'>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Log in!</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
}
