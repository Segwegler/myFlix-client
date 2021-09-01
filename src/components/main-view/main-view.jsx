import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MyNavBar from '../nav-bar/nav-bar';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import UserView from "../user-view/user-view";

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state ={
      movies:[],
      user: null
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      this.setState({
        user: localStorage.getItem('user')
      });
    }

    axios.get('https://nsegler-myflixdb.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  //after login processing from login-view
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user' , authData.user.Username);
  }

  onUpdate(userData) {
    this.setState({
      user: userData.Username
    });
    localStorage.setItem('user' , userData.Username);
  }

  //will be used to clear user session
  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
  }

  getMovies(token) {
    axios.get('https://nsegler-myflixdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      this.setState({
        movies:response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  getUser() {
    axios.get(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  addMovie(id){
    if(!localStorage.getItem('user')){
      window.open("/login","_self");
      return ;
    }
    axios.post(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`,{},
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response =>{
        console.log(response);
    }).catch(function (error){
      console.log(error);
    });
  }

  removeMovie(id){
    axios.delete(`https://nsegler-myflixdb.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`,
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response =>{
        console.log(response);
    }).catch(function (error){
      console.log(error);
    });
  }

  render(){
    const { movies, user } = this.state;

    const nav = <MyNavBar user={user} onLoggedOut = {() => this.onLoggedOut()} />

    if(movies.length ===0)
      return <div className="main-view"/>;

    return (
      <Router>
      {nav}
        <Container>
          <Row className="main-view justify-content-md-center mt-1">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id} className="p-1">
                  <MovieCard addMovie={id => this.addMovie(id)} movie={m} />
                </Col>
              ))
            }} />

            <Route path="/login" render={({history}) => {
              if(user) return <Redirect to="/" />
              return <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            <Route path="/register" render={({history}) => {
              if(user) return <Redirect to="/" />
              return <Col md={8}>
                <RegistrationView onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            <Route path="/user" render={({history}) => {
              if(!user) return <Redirect to="/login" />
              return <Col md={10}>
                <UserView movies={movies} onLoggedOut={() => this.onLoggedOut()}removeMovie={id => this.removeMovie(id)} onUpdate={userData => this.onUpdate(userData)} onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) =>{
              if(movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) =>{
              if(movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }

}
