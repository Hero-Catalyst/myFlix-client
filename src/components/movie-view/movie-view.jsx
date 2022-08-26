import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Col, Row, Container } from 'react-bootstrap';
import Link from 'react-router-dom';

import movieviewscss from './movie-view.scss';

export class MovieView extends React.Component {

  //Component method that acts as callback function
  /*keypressCallBack(event) {
    console.log(event.key);
  }

  //Adding event listener "keypress"
  componentDidMount() {                   //the callback function from above
    document.addEventListener('keypress', this.keypressCallBack);
  }*/

  //Removing the event listener
  //componentWillUnmount() {
  //document.removeEventListener('keypress', this.keypressCallBack);
  //}

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row>
          <Col>
            <div className="movie-poster">
              <img crossorigin="anonymous" src={movie.ImagePath} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title:</span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description:</span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-genre">
              <span className="label">Genre:</span>
              <span className="value">{movie.Genre}</span>
            </div>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-director">
              <span className="label">Director:</span>
              <span className="value">{movie.Director}</span>
            </div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <ButtonGroup size="lg">
              <Button onClick={() => { onBackClick(null); }}>Back</Button>
              <Button variant="info" onClick={() => { }}>Add to Favorites</Button>
              <Button variant="danger" onClick={() => { }}>Remove from Favorites</Button>
            </ButtonGroup>
          </Col>
        </Row>

      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}