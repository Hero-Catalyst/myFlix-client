import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


export function FavoriteMovies() {

  const { favoriteMovies, setFavoriteMovies } = useState("");


  const favoriteMovieList = (token, user) => {
    axios.get(`https://myflix-movieapi-76028.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch(function (error) {
        console.log(error);
      });

  };



  return (
    <Container>
      <Row>
        <Col>
          {favoriteMovieList.map((movie) => {
            return (
              <Card key={movie._id}>

                <Card.Img variant-="top" crossOrigin="anonymous" src={movie.ImagePath} />
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
    </Container>
  )
}