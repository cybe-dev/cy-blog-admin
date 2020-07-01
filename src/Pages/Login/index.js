import React, { Component } from "react";
import "../../css/tailwind.css";
import "../../App.css";
import axios from "axios";

import { backendBaseUrl, asyncLocalStorage } from "../../setting";

import { Alert, InputText, Spinner, Button } from "../../Components";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertShown: false,
      loading: false,
      email: null,
      password: null,
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.setHeaderShown(false);
    this.props.setTitle({
      title: "Login",
    });
  }

  login(e) {
    const getThis = this;

    getThis.setState({ loading: true });

    axios
      .post(backendBaseUrl + "auth/get-token", {
        email: getThis.state.email,
        password: getThis.state.password,
      })
      .then(function (response) {
        console.log(response.data);

        asyncLocalStorage.setItem("id", response.data.data.id).then(() => {});

        asyncLocalStorage.setItem("jwt", response.data.data.token).then(() => {
          getThis.setState({ alertShown: false });
          getThis.props.jwtHandler();
        });
      })
      .catch(function (error) {
        console.log(error.response.data);

        getThis.setState({
          alertShown: error.response.data.message,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div>
        <Spinner loading={this.state.loading} />
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
          <div className="w-full md:w-1/3">
            <div className="bg-gray-200 rounded-sm m-5 p-5 shadow-md">
              <h3 className="mb-5 text-center text-3xl title">Login</h3>
              {this.state.alertShown && (
                <Alert
                  color="red"
                  style={{ textAlign: "center" }}
                  body={this.state.alertShown}
                />
              )}
              <form>
                <InputText
                  label="Email"
                  type="email"
                  onChange={(event) => {
                    this.setState({ email: event.target.value });
                  }}
                />
                <InputText
                  label="Password"
                  type="password"
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
                <Button
                  type="button"
                  disabled={this.state.loading}
                  color="blue"
                  onClick={this.login}
                  className="px-5 my-2 float-right"
                >
                  Masuk
                </Button>
                <div className="clear-both"></div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center text-gray-700"
          style={{ height: 55, marginTop: -55 }}
        >
          &copy;2020 - CyBlog
        </div>
      </div>
    );
  }
}

export default Login;
