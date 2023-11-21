import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Router } from "react-router-dom";
import {Form, Button, Card, CardGroup, Container, Col, Row, CardBody } from 'react-bootstrap'; 


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleMovieClick = (movie) => {
    // Handle the click event here
    console.log('Movie clicked:', movie);

  };
  useEffect(() => {
    if (!token) {
      return;
  }
   fetch("https://iyas-movies-d1500c6f9580.herokuapp.com/movies",{
   headers: { Authorization: `Bearer ${token}` },
  })
       .then((response) => response.json())
       .then((data) => {
           console.log(data);
           const moviesFromApi = data.map((movie) => {
               return {
                   _id: movie._id,
                   title: movie.title,
                   imagePath: movie?.image,
                   description: movie.description,
                   releaseDate: movie.releaseDate,
                   genre: {
                       name: movie.genre.name,
                       genreDescription: movie.genre.description,
                   },
                   director: {
                       directorName: movie.director.name,
                       birth: movie.director.birth,
                   },
               };
           });
           setMovies(data);
       });
      }, [token]);

      return (
        
        <BrowserRouter>
     <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
        <Row className="justify-content-md-center">
          <Routes>
            <Route path="/signup"
            element={
              <>
          {user ? (
            <Navigate to ="/"/>
          ) : (
            <Col md={5}>
              <SignupView />
            </Col>
          )}
          </>
            }
            />

            <Route 
            path="/login"
            element={
              <>
              {user?(
              <Navigate to="/"/>
             ) : ( 
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
            </Col>
          )}
         </>
        }
        />
          <Route path="/movies/:movieId"
            element={
            <>
          {!user ? (
         <Navigate to="/login"rplace
         />
         ) : movies.length === 0 ? (
        <Col> The List is empty!</Col>
        ) : (
        <Col md={8}>
        <MovieView movies={movies} />
       
        </Col>
      )}
    </>
    }
    />
   
        <Route
          path="/"
          element={
            <>
            {!user ? (
              <Navigate to ="/login" replace 
              />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
              {movies.map((movie) => ( <Col className="mb-4" key={movie._id} md={3}>
                <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                
                </Col>
              ))}
              </>
              )}
              </>
              }
              />
                  <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                       user={user}
                       token={token}
                       setUser={setUser}
                        movies={movies}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
            </Routes>

          </Row>
        
        </BrowserRouter>
      );
    };
