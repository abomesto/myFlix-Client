import{ useState } from "react";
import {Form, Button, Card, CardGroup, Container, Col, Row, CardBody } from 'react-bootstrap'; 

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://iyas-movies-d1500c6f9580.herokuapp.com/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
       <Row>
        <Col>
        <CardGroup>
        <Card>
            <CardBody>
              <Card.Title> Or  Sign Up </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Label>
        Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
          placeholder= "Enter a Username Please"
        />
          </Form.Group>
      <Form.Group>
      <Form.Label> Password </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Choose a Smart Password with 8 or mor Charcters"
        />
      </Form.Group>

      <Form.Group>
      <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter Your E-mail Address"
         />
      </Form.Group>
      <Form.Group>
      <Form.Label> Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit
      </Button>
      </Form>
      </CardBody>
      </Card>
        </CardGroup>
  </Col>
</Row>
    </Container>
  );
};
