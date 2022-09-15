import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";


export function FavoriteMovies() {

  const { favoriteMovies, setFavoriteMovies } = useState([]);

  const favoriteMovieList = (token, user) => {
    axios.get(`https://myflix-movieapi-76028.herokuapp.com/users/${user}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setFavoriteMovies([response.data.FavoriteMovies]);
      })
      .catch(function (error) {
        console.log(error);
      });

  };







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
        {favoriteMovies.map((movies) => {
          return (
            <Card key={movies._id}>

              <Card.Img variant-="top" src={movies.ImagePath} />
              <Card.Body>
                <Card.Title>{movies.Title}</Card.Title>
                <Card.Text>{movies.Description}</Card.Text>
                <Link to={`/movies/${movies._id}`}>
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