import React from "react";
import { Card } from "react-bootstrap";



export class DirectorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card clssName="director-view">
        <Card.Body>
          <Card.Header>Director</Card.Header>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>Bio: {director.Bio}</Card.Text>
          <Card.Text>Born: {director.Birthday}</Card.Text>

          <Button onClick={() => onBackClick()}>Back</Button>

        </Card.Body>
      </Card>
    );
  }

}