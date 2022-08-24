import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
          Genre: 'Action',
          Director: 'Christopher Nolan',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Inception_OST.jpg/220px-Inception_OST.jpg'
        },
        {
          _id: 2,
          Title: 'The Shawshank Redemption',
          Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
          Genre: 'Drama',
          Director: 'Frank Darabont',
          ImagePath: 'https://m.media-amazon.com/images/I/519NBNHX5BL._SY445_.jpg'
        },
        {
          _id: 3,
          Title: 'Gladiator',
          Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
          Genre: 'Drama',
          Director: 'Ridley Scott',
          ImagePath: 'https://play-lh.googleusercontent.com/BFmxSPfvjeuQtqbGn6gNBet8nEm8jc7tQIBKfMMVS4TmstdP1brZIc3Lj0yM-HApGPKVMvv04pYD8bbNgrg=w240-h480-rw'
        }
      ],
      selectedMovie: null
    };
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
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
              this.setSelectedMovie(movie)
            }} />
          ))
        }
      </div>
    );
  }

}
