import React from 'react';
import axios from 'axios';

//used to route to different views
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

//action/reducer import
import { setMovies, setUser } from '../../actions/actions';

//import used bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//import created components
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MyNavBar from '../nav-bar/nav-bar';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import UserView from "../user-view/user-view";

const API_ADDRESS = "https://nsegler-myflixdb.herokuapp.com";

//The mainview controlls the view displayed
class MainView extends React.Component {

  //Loads movies and user if user and token are stored in local stroage
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      if(!("Username" in this.props.user)){
        this.getUser();
      }
    }
    this.getMovies();
  }

  //retrives the movie list from the api
  getMovies() {
    axios.get(`${API_ADDRESS}/movies`).then(response => {
      this.props.setMovies(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  login(username, password) {
    axios.post(`${API_ADDRESS}/login`, {
      Username: username,
      Password: password
    }).then( response => {
      this.onLoggedIn(response.data);
    }).catch( e => {
      console.log('user not found',e);
    });
  }

  //after login processing from login-view
  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user' , authData.user.Username);
  }

  onUpdate(userData) {
    localStorage.setItem('user' , userData.Username);
  }

  //will be used to clear user session
  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({});
    window.open("/","_self");
  }


  getUser() {
    axios.get(`${API_ADDRESS}/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      this.props.setUser(response.data);
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
    if(this.props.user.FavoriteMovies.includes(id)){
      return;
    }
    axios.post(`${API_ADDRESS}/users/${localStorage.getItem('user')}/movies/${id}`,{},
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response =>{
        this.getUser();
    }).catch(function (error){
      console.log(error);
    });
  }

  removeMovie(id){
    if(!localStorage.getItem('user')){
      window.open("/login","_self");
      return ;
    }
    if(!this.props.user.FavoriteMovies.includes(id)){
      return;
    }
    axios.delete(`${API_ADDRESS}/users/${localStorage.getItem('user')}/movies/${id}`,
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response =>{
        this.getUser();
    }).catch(function (error){
      console.log(error);
    });
  }

  render(){

    let { movies, user } = this.props;

    const nav = <MyNavBar onLoggedOut = {() => this.onLoggedOut()} />

    return (
      <Router>
      {nav}
        <Container>
          <Row className="main-view justify-content-md-center mt-1">
            <Route exact path="/" render={() => {

              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList addMovie={id => this.addMovie(id)} removeMovie={id => this.removeMovie(id)}/>;

            }} />

            <Route path="/login" render={({history}) => {
              if("Username" in user) return <Redirect to="/" />
              return <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} login={(username, password) => this.login(username, password)} />
              </Col>
            }} />

            <Route path="/register" render={({history}) => {
              if("Username" in user) return <Redirect to="/" />
              return <Col md={8}>
                <RegistrationView onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            <Route path="/user" render={({history}) => {
              if(!user) return <Redirect to="/login" />
              return <Col md={10}>
                <UserView movies={movies} onLoggedOut={() => this.onLoggedOut()} removeMovie={id => this.removeMovie(id)} onUpdate={userData => this.onUpdate(userData)} onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} addMovie={id => this.addMovie(id)} removeMovie={id => this.removeMovie(id)} onBackClick={() => history.goBack()} />
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);
