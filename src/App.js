import React, { Component } from "react";
import {
  Login,
  NotFound,
  Layout,
  Dashboard,
  Post,
  Category,
  CreatePost,
  Profile,
  ChangePassword,
  Setting,
} from "./Pages";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { AuthRoute, PrivateRoute, PublicRoute } from "./Router";

import { asyncLocalStorage } from "./setting";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: null,
      loading: true,
    };

    this.updateJwt = this.updateJwt.bind(this);
  }

  updateJwt(e) {
    asyncLocalStorage.getItem("jwt").then((jwt) => {
      this.setState({ jwt });
      window.scrollTo(0, 0);
    });
  }

  componentDidMount() {
    asyncLocalStorage.getItem("jwt").then((jwt) => {
      this.setState({ jwt, loading: false });
    });
  }
  render() {
    const { jwt, loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <Router>
        <Layout jwtHandler={this.updateJwt} auth={jwt}>
          <AuthRoute
            path="/login"
            jwtHandler={this.updateJwt}
            component={Login}
          />
          <PrivateRoute path="/category" exact={true} component={Category} />
          <PrivateRoute path="/post/edit/:slug" component={CreatePost} />
          <PrivateRoute path="/post/create" component={CreatePost} />
          <PrivateRoute path="/post" component={Post} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/change-password" component={ChangePassword} />
          <PrivateRoute path="/setting" component={Setting} />
          <PublicRoute path="/404" component={NotFound} />
          <PrivateRoute path="/" exact={true} component={Dashboard} />
          <Route path="*">
            <Redirect to={{ pathname: "/404" }} />
          </Route>
        </Layout>
      </Router>
    );
  }
}

export default App;
