import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
//import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Field from "./components/field/Field";
import Kakao from "./components/auth/Kakao";
import Notices from "./components/notices/Notices";
import Notice from "./components/notice/Notice";
import Rules from "./components/rules/Rules";
import AddFiles from "./components/files/AddFiles";

// Material UI
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./utils/Theme";

import "./App.css";

// Check for token for every page request
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user information and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={Theme}>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/kakao/:token" component={Kakao} />{" "}
                <Switch>
                  <PrivateRoute exact path="/notices" component={Notices} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/notice/:id" component={Notice} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/rules" component={Rules} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/feed" component={Posts} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/field" component={Field} />
                </Switch>
                <Route exact path="/notfound" component={NotFound} />
              </div>
              {/* <Footer /> */}
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
