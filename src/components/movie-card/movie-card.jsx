import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

function MovieCard(props){

  const {movie, addMovie, removeMovie, user} = props;
  let favorite = false;
  if(Object.keys(user).indexOf("FavoriteMovies") > -1){
    if(user.FavoriteMovies.includes(movie._id)){
      favorite = true;
    }
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description.length>=97 ? movie.Description.substring(0,100) + "..." : movie.Description }</Card.Text>
        <Link to={`/movies/${movie._id}`} >
          <Button variant="link">Open</Button>
        </Link>
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


export default connect(mapStateToProps)(MovieCard);

MovieCard.propTypes = {
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
    }).isRequiredm,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};
