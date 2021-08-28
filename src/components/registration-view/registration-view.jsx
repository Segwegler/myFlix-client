import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup'


export default function RegistrationView(props){
  const [form   , setForm  ] = useState({});
  const [errors , setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]:value
    })
    if( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const isAlphaNumeric = (str) => {
    for(var i=0; i<str.length; i++){
      var code = str.charCodeAt(i);
      if( !(code > 47 && code < 58) &&  // Numbers (0-9)
          !(code > 64 && code < 91) &&  // Uppercase letters (A-Z)
          !(code > 96 && code < 123)) { // lowercase letters (a-z)
         return false;
      }
    }
    return true;
  };

  const isValidEmail = (mail) => {
    return /^\S+@\S+\.\S+$/.test(mail);
  }

  const findFormErrors = () => {
    const {username, password, email} = form
    setErrors({});
    const newErrors = {};
    //username Errors
    if( !username || username === "" ) newErrors.username = "Username is required";
    else if(!isAlphaNumeric(username)) newErrors.username = "Username can only be letters and numbers";
    //password Errors
    if( !password || password === "") newErrors.password = "Password is required";
    else if(password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    //Email errors
    if( !email || email === "") newErrors.email = "Email is required";
    else if( !isValidEmail(email)) newErrors.email = "Email does not seem to be vailid"

    return newErrors;
  }

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const newErrors = findFormErrors();

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
    }else{
      axios.post('https://nsegler-myflixdb.herokuapp.com/users',{
        Username: form.username,
        Password: form.password,
        Email: form.email,
      }).then( response => {
        const data = response.data;
        console.log(data);
        props.onBackClick();
      }).catch(e => {
        console.log('error registering the user');
        console.log(e.response.data.errors);
        if(e.response.data.errors){
          if(e.response.data.errors[0].param === "Email"){
            newErrors.email = e.response.data.errors[0].msg;
            setErrors(newErrors);
          }
        }
      });
    }

  };

  return(
    <Card className="mt-5">
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                onChange={ e => setField('username', e.target.value)}
                isInvalid={ !!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                onChange={ e => setField('password', e.target.value)}
                isInvalid = {!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                onChange={ e => setField('email', e.target.value)}
                isInvalid = {!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button type="submit">Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );

}
