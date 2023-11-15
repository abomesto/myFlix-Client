import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "Into the Wild",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/dc/Into_the_Wild_%282007_film_poster%29.png",
      director: "Sean Penn"
    },
    {
      id: 3,
      title: "V for Vandetta",
      image:
        "https://upload.wikimedia.org/wikipedia/en/9/9f/Vforvendettamov.jpg",
      director: "James McTeigue"
    },
  ]);

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