import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

export default class DirectorView extends React.Component {
  render(){
    const {director, onBackClick} = this.props;
    
    return (
      <Card>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Button onClick = {()=>{onBackClick();}} variant="link">Back</Button>
        </Card.Body>
      </Card>
    );

  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
