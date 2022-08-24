import React from 'react';
//use axios to fetch movie database
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor() {
    //Super calls the parent "React.Component", which will give the class the actual React compnonent's features
    //Also initializes the component's "this" variable - super is mandatory for including "constructor()" method in component
    super();
    //Code executed right when the component is created in memory - happens before "render"
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  //get request for movies list from heroku
  componentDidMount() {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={
            newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }} />

          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie)
            }} />
          ))
        }
      </div>
    );
  }

  //componentDidMount() {
  //code executed right after the component is added to the DOM (user can see it)
  //good place for performing async tasks (making ajax requests, event listeners)
  //event listeners such as keydown, keyup for browser games
  //}

}
