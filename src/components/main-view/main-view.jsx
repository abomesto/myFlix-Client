import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]); 
  useEffect(() => {
   fetch("https://iyas-movies-d1500c6f9580.herokuapp.com/movies")
       .then((response) => response.json())
       .then((data) => {
           console.log(data);
           const moviesFromApi = data.map((movie) => {
               return {
                   _id: movie._id,
                   title: movie.title,
                   imagePath: movie.imagePath,
                   description: movie.description,
                   releaseDate: movie.releaseDate,
                   genre: {
                       genreName: movie.genre.genreName,
                       genreDescription: movie.genre.genreDescription,
                   },
                   director: {
                       directorName: movie.director.directorName,
                       birth: movie.director.birth,
                   },
               };
           });
           setMovies(moviesFromApi);
       });
      }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
      imagePath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.shape({
          genreName: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
      director: PropTypes.shape({
          directorName: PropTypes.string.isRequired,
      }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};