import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function UserView(props) {
  const [userData, setUserData] = useState({});
  const [form   , setForm  ] = useState(null);
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

  const getUser = () => {
    axios.get(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      setUserData(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const deleteUser = () => {
    axios.delete(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      props.onLoggedOut();
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  const showFavorites = () => {
    if(!userData.FavoriteMovies || userData.FavoriteMovies.length < 1){
      return (<>
        <Card.Text> Check out some movies on the home page</Card.Text>
        <Button onClick={()=> {window.open("/","_self")}}> Home</Button>
      </>);
    }
    var faves = [];
    userData.FavoriteMovies.map(f => (
      faves.push(props.movies.find(m => m._id === f))
    ))
    return (<Row>
      {faves.map(m => (
        <Col md={3} key={m._id} className="p-1">
          <Card className="h-100">
            <Card.Img src={m.ImagePath} variant="top" />
            <Card.Body>
              <Card.Title>{m.Title}</Card.Title>
              <Link to={`/movies/${m._id}`}>
                <Button variant="link">Open</Button>
              </Link>
              <Button variant="danger" onClick={() => removeMovie(m._id)}>Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>);
  }

  const updateUser = (updateObject) => {
    axios.put(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}`,
      updateObject,
      { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`} }
      ).then(response => {
        setUserData(response.data);
        props.onUpdate(response.data);
        console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const removeMovie = (id) => {
    if(userData.FavoriteMovies.indexOf(id) > -1){
      props.removeMovie(id);
    }
  }

  //Error checking functions
  //checks if the
  const isAlphaNumeric = (str) => {
    return /^(\d|\w)+$/.test(str);
  };

  const isValidEmail = (mail) => {
    return /^\S+@\S+\.\S+$/.test(mail);
  }

  //function to check for erros in the form
  const findFormErrors = () => {
    const {username, password, passwordConfirm, email} = form
    setErrors({});
    const newErrors = {};
    //username Errors
    if( !(!username || username === "") ){
      if(!isAlphaNumeric(username)) newErrors.username = "Username can only be letters and numbers";
    }
    //password Errors
    if( !(!password || password === "") ){
      if(password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    }

    if(passwordConfirm !== password) newErrors.passwordConfirm = "New passwords must match"

    //Email errors
    if( !(!email || email === "") ){
      if( !isValidEmail(email)) newErrors.email = "Email does not seem to be vailid"
    }
    return newErrors;
  }

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const newErrors = findFormErrors();

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
    }else{
      var updateObject = {};
      Object.keys(form).forEach(key => {
        var casedKey = key[0].toUpperCase() + key.slice(1);
        if(!!form[key] && key !== "PasswordConfirm") updateObject[casedKey] = form[key];
      });
      updateUser(updateObject);
    }
  }

  return (

    <Card>
      <Card.Body>
      <Card.Title>Profile</Card.Title>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              onChange={ e => setField('username', e.target.value)}
              isInvalid={!!errors.username}
              placeholder = {userData.Username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              onChange={ e => setField('password', e.target.value)}
              isInvalid = {!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formPasswordConfirm">
          <Form.Label>Confirm Password:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              onChange={ e => setField('passwordConfirm', e.target.value)}
              isInvalid = {!!errors.passwordConfirm}
            />
            <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder = {userData.Email}
              onChange={ e => setField('email', e.target.value)}
              isInvalid = {!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Label>Enter the information you want to change then click Update</Form.Label><br/>
        <Button disabled={ !!form ? false : true} type="submit">Update</Button>
      </Form>

      </Card.Body>

      <Card.Body>
        <Card.Title>Delete Account</Card.Title>
        <Card.Text>All of your information will be deleted! There is no going back</Card.Text>
        <Button variant="danger" onClick={()=>deleteUser()}>Delete!</Button>
      </Card.Body>

      <Card.Body>
        <Card.Title>Favorite Movies</Card.Title>
        {showFavorites()}
      </Card.Body>
    </Card>
  );


}
