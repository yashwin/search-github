import React, { Component } from 'react';
import { Router, Route} from 'react-router-dom'
import HomePage from '../../src/components/HomePage';
import RepoDetailsPage from '../../src/components/RepoDetailsPage';
import UserDetailsPage from '../../src/components/UserDetailsPage';
import {createBrowserHistory} from 'history';


let history = createBrowserHistory({
});

class NavBar extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/repo/:repoName" component={RepoDetailsPage}/>
          <Route path="/user/:userName" component={UserDetailsPage}/>
        </div>
      </Router>
    );
  }
}

export default NavBar;
