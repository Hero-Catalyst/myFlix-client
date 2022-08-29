import React from 'react';
import { Card } from 'react-bootstrap';



export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card clssName="genre-view">
        <Card.Body>
          <Card.Header>Genre</Card.Header>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>Description: {genre.Description}</Card.Text>

          <Button onClick={() => onBackClick()}>Back</Button>

        </Card.Body>
      </Card>
    );
  }
}