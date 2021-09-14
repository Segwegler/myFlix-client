import React from 'react';

//import redux connect function
import { connect } from 'react-redux';

//import used bootstrap components
import Col from 'react-bootstrap/Col';

//import used components
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

//Maps used state components
const mapStateToProps = state => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};


function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;
  //console.log(props, "movieslist");
  if(visibilityFilter !== ''){
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if(!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3}  key={m._id} className="p-1">
        <MovieCard movie={m} addMovie={id => props.addMovie(id)} removeMovie={id => props.removeMovie(id)}/>
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);
