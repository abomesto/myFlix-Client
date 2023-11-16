import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
        Username: username,
        Password: password
      };

    fetch("https://iyas-movies-d1500c6f9580.herokuapp.com/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(data)
    })          .then((response) => response.json()) //transforms the response content into a JSON object that can be used to extract the JWT sent by API.
    .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user)); //use localStorage to store the user object
            localStorage.setItem('token', data.token); //use the localStorage to store the token
            onLoggedIn(data.user, data.token); //pass the user and token back to MainView so they can be used in all the subsequent API requests.
        } else {
            alert('No such user');
        }
    })
    .catch((e) => {
        alert('Something went wrong');
    });
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};