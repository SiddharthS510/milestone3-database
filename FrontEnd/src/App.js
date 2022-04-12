import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import AllBooks from "./components/ViewBooks";
import AuthorBooks from "./components/AuthorBooks";
import GenreBooks from "./components/GenreBooks";

class App extends Component {

  state = { isLoggedIn: false, userId: '', userData: {} }

  setloggedInStatus = (userId, userData) => { this.setState({ isLoggedIn: true, userId, userData }) }

  render() {
    const { userId, userData, isLoggedIn } = this.state
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark" id="colour">
          <span className="navbar-brand">Library</span>
          <ul className={"navbar-nav" + (isLoggedIn ? '  ml-auto' : "")}>
            {!isLoggedIn && <li className="nav-item">
              <Link className="nav-link" to="/login"> Login </Link>
            </li>}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/allBooks">Hi {userData.name}!</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/allBooks"> View All &amp; Issued Books </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => this.setState({isLoggedIn : false})}>Logout</span>
                </li>
              </>
            )}
          </ul>
        </nav>

        {!isLoggedIn && (
          <Switch>
            <Route exact path="/login" render={() => <Login setloggedInStatus={this.setloggedInStatus} />} />
            <Route path="*" component={() => <Redirect to='/login' />} />
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            <Route exact path="/allBooks" render={() => <AllBooks userId={userId} />} />
            <Route exact path="/issuedBooks" render={() => <AllBooks userId={userId} />} />
            <Route exact path="/author/:authorName" render={({ match }) => <AuthorBooks userId={userId} authorName={match.params.authorName} />} />
            <Route exact path="/genre/:genre" render={({ match }) => <GenreBooks userId={userId} genre={match.params.genre} />} />
            <Route exact path="*" component={() => <Redirect to={`/allBooks`} />} />
          </Switch>
        )}

      </Router>
    );
  }
}

export default App;