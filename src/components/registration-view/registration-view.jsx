import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export function RegistrationView(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email   , setEmail   ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username , password, email);

    props.onRegister(username);
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
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" onChange={e=> setEmail(e.target.value)} />
      </Form.Group>

      <Button type="button" onClick={handleSubmit}>Register</Button>
    </Form>
      </Card.Body>
    </Card>
  );

}
