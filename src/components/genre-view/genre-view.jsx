import React from 'react';
import { Card } from 'react-bootstrap';



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