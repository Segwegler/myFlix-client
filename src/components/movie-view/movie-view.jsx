import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { movies , user} = state;
  return { movies , user};
};

function MovieView(props) {

    const {movie, user, onBackClick, addMovie, removeMovie} = props;

    let favorite = false;
    if(Object.keys(user).indexOf("FavoriteMovies") > -1){
      if(user.FavoriteMovies.includes(movie._id)){
        favorite = true;
      }
    }

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick = {()=>{onBackClick(null);}} variant="link">Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          { favorite
           ? <Button variant="danger" onClick={() => removeMovie(movie._id)}>Remove</Button>
           : <Button onClick={() => addMovie(movie._id)}>Add to favorites</Button>
          }
        </Card.Body>
      </Card>
    );


}

export default connect(mapStateToProps)(MovieView);

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
