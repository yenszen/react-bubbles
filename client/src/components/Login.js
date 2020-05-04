import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "./Login.css";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  onInputChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          credentials: {
            username: "",
            password: ""
          }
        });
        alert("Username and/or password incorrect!");
      });
  };

  render() {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    return (
      <div>
        <div className="login-page">
          <form onSubmit={this.onFormSubmit} className="login-form">
            <h4>Welcome to React Bubbles</h4>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.credentials.username}
              onChange={this.onInputChange}
              className="fields"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.credentials.password}
              onChange={this.onInputChange}
              className="fields"
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
