import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state ={
      movies:[],
      selectedMovie: null,
      user: null,
      login: true,
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
      user:null
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

    if (login)//checks if the login prompt is active
       return <LoginView onLoggedIn={user => this.onLoggedIn(user)} goToReg={() =>{this.setRegPrompt(true); this.setLoginPrompt(false);}}/>;

    if (register)//checks if the registration prompt is active
      return <RegistrationView onRegister={register => this.onRegister(register)}/>

    if(movies.length ===0)
      return <div className="main-view"/>;

    return (
        <div className="main-view">
          {user
            ? <div> {user} <button onClick = {() => this.onLoggedOut()}>Log out</button></div>
            : <button onClick = {() => this.setLoginPrompt(true)}>Log in or register</button>

          }
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) =>{this.setSelectedMovie(movie);} } />
            ))
          }
        </div>
    );
  }

}
