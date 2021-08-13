import React from 'react';

export default class MovieView extends React.Component {
  render(){
    const {movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath}/>
        </div>
        <div className="movie-Title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick = {()=>{onBackClick(null);}}>Back</button>
      </div>
    );

  }
}
