return (
    <Row className="justify-content-md-center">
    {!user ? (
      <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
        or
        <SignupView />
      </Col>
    ) : selectedMovie ? (
      <Col md={8}>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        {movies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </>
    )}
  </Row>
);
};