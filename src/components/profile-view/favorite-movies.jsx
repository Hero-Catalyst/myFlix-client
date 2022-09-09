import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';


export function FavoriteMovies({ favoriteMovieList }) {






  /*need movie map
const fruits = new Map([
["apples", 500],
["bananas", 300],
["oranges", 200]
]);
fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);
fruits.delete();
*/


  return (
    <Row>
      <Col>
        {favoriteMovieList.map((movies) => {
          return (
            <Card key={movies._id}>

              <Card.Img variant-="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Open</Button>
                </Link>
              </Card.Body>
            </Card>
          )
        })
        }
      </Col>
    </Row>
  )
}