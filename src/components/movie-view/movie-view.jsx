import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onBackClick }) => {
  console.log(movies);
  const { movieId } = useParams();
  const movie = movies.find((mov) => {
    return mov._id === movieId;
  });
  console.log(movie);
  return (
    <Card className="h-100 w-100">
      <Card.Img className="w-100 h-100" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <p>Genre: {movie.genre.name}</p>
          <p> Summary :{movie.summary} </p>
          <p>Director: {movie.director.name}</p>
          <p>Release Year : {movie.additionalAttribute.releaseYear}</p>
          <p>Rating: {movie.additionalAttribute.rating}</p>
        </Card.Text>
        <Link to="/">
          <Button
            onClick={onBackClick}
            className="back-button"
            style={{ cursor: "pointer" }}
          >
            Back
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      summary: PropTypes.string.isRequired,
      additionalAttribute: PropTypes.shape({
        releaseYear: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
