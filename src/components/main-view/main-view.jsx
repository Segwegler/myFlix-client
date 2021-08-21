import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MyNavBar } from '../nav-bar/nav-bar';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state ={
      movies:[],
      selectedMovie: null,
      user: null,
      login: false,
      register: false
    };
  }

  componentDidMount(){
    axios.get('https://nsegler-myflixdb.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  home(){
    this.setState({
      selectedMovie: null,
      login: false,
      register: false
    })
  }

  setSelectedMovie(newSelectedMovie){
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  //after reg processing in registration-view
  onRegister(user){
    this.setState({
      user: user
    });
    console.log(user);
    this.setRegPrompt(false);
  }

  //after login processing from login-view
  onLoggedIn(user) {
    this.setState({
      user: user
    });
    this.setLoginPrompt(false);
  }

  //will be used to clear user session
  onLoggedOut(){
    this.setState({
      user:null,
      login: false,
      register: false
    });
  }

  //used to open or close login page
  setLoginPrompt(active) {
    this.setState({
      login: active
    });
  }

  //used to activate or deactivate registration
  setRegPrompt(active) {
    this.setState({
      register: active
    });
  }

  render(){
    const { movies, selectedMovie, user, login, register } = this.state;

    const nav = <MyNavBar user={user} home={()=>this.home()} goToReg={(reg) =>{this.setRegPrompt(reg); this.setLoginPrompt(false);}} setLoginPrompt={(e) => this.setLoginPrompt(e)} onLoggedOut = {() => this.onLoggedOut()} />

    if (login)//checks if the login prompt is active
      return (
        <div>
          {nav}
          <Container>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} goToReg={() =>{this.setRegPrompt(true); this.setLoginPrompt(false);}}/>
          </Container>
        </div>
      );

    if (register)//checks if the registration prompt is active
      return (
        <div>
          {nav}
          <Container>
            <RegistrationView onRegister={register => this.onRegister(register)}/>
          </Container>
        </div>
      );

    if(movies.length ===0)
      return <div className="main-view"/>;

    return (
        <div className="main-view">
          {nav}
          <Container>
          <Row className="justify-content-md-center">
          {selectedMovie
            ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                  </Col>
              )
            : movies.map(movie => (
                <Col key={movie._id} md={3} className="p-1">
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) =>{this.setSelectedMovie(movie);} } />
                </Col>
              ))
          }
          </Row>
          </Container>
        </div>
    );
  }

}
