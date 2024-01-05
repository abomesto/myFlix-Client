import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const MovieCard = ({ user, movie, onMovieClick, updateUser }) => {
  const isFav = user.FavoriteMovies.includes(movie._id);

  const addToFav = (movieId) => {
    //updateUser(response.data)
  };
  const removeFromFav = (movieId) => {
    //updateUser(response.data)
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.genre.name} {movie.additionalAttribute.releaseYear}
        </Card.Text>
        <Link to={`movies/${movie._id}`}>
          <Button varient="link">Open</Button>
        </Link>
        {isFav ? (
          <Button className="btn btn-secondary">
            <FaHeart style={{ color: "red" }} />
            {""}
          </Button>
        ) : (
          <Button className="btn btn-secondary">
            <FaRegHeart />
            {""}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     imagePath: PropTypes.string.isRequired,
//     genre: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//     }).isRequired,
//     summary: PropTypes.string.isRequired,
//     additionalAttribute: PropTypes.shape({
//       releaseYear: PropTypes.number.isRequired,
//     }).isRequired,
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// };
