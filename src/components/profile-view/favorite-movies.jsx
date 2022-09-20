import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


export function FavoriteMovies(props) {

  const { movies, favoriteMovies } = props;

  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");


  const favoriteMovieList = movies.filter((m) => {
    return favoriteMovies.includes(m._id);
  });

  const removeFav = (movie, user) => {
    //function for remove favorite movie button
    axios.delete(`https://myflix-movieapi-76028.herokuapp.com/users/${currentUser}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Movie was removed from your favorites.");
      })
      .catch((err) => {
        console.log(err);
      });

  };



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
                  <Button variant="warning" onClick={() => removeFav(movie._id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}