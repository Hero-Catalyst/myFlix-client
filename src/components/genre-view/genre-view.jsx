import React from 'react';
import { Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';



export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      users: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getGenres(accessToken);
    }
  }

  getGenres(token) {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          genres: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const { genres, onBackClick } = this.props;

    return (
      <Router>
        <Row className="genre-view justify-content-md-center">
          <Route exact path="/genres" render={() => {
            return (
              genres.map(m => (
                <Col md={3} key={g._id}>
                  <GenreCard genre={g} />
                </Col>
              ))
            );
          }} />

          <Card className="genre-card">
            <Card.Body>
              <Card.Header>Genre</Card.Header>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>

              <Button onClick={() => onBackClick()}>Back</Button>

            </Card.Body>
          </Card>
        </Row>
      </Router>
    );
  }
}