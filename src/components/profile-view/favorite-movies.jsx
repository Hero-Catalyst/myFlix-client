import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


export function FavoriteMovies(props) {

  const { movies, favoriteMovies } = props;


  const favoriteMovieList = movies.filter((m) => {
    return favoriteMovies.includes(m._id);
  });



  return (
    <Container>
      <Row>
        <Col>
          {favoriteMovieList.map((movie) => {
            return (
              <Card key={movie._id}>
                <Card.Img
                  variant-="top"
                  crossOrigin="anonymous"
                  src={movie.ImagePath}
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}