import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';



export default class MovieCard extends React.Component {

  render(){
    const {movie, addMovie} = this.props;

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
          <Button onClick={() => addMovie(movie._id)}>Add to favorites</Button>
        </Card.Body>
      </Card>
    );
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
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
