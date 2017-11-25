import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { searchGithubRepos } from '../Actions/SearchGithubReposAction';
import { searchGithubUsers } from '../Actions/SearchGithubUsersAction';
import { Table, Form, FormGroup, Col, ControlLabel, FormControl, Radio, Button, Grid, Row } from 'react-bootstrap';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchUsers: false,
      searchRepos: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    })
  }

  handleSearch = (e) => {
    var searchTerm = this.state.searchTerm
    if( searchTerm !== "" ) {
      if(this.state.searchRepos) {
        this.props.searchGithubRepos(searchTerm);
      }
      if(this.state.searchUsers) {
        this.props.searchGithubUsers(searchTerm);
      }
    }
  }

  handleRadio = (e) => {
    this.setState({
      [`${e.target.value}`]: e.target.checked
    })
  }

  render() {

    const {searchTerm,searchUsers,searchRepos} = this.state;
    const {repos, users} = this.props;

    return (
      <div className="search-container">
        <div>
          <div className="heading-1">Search Github Repo/Username</div>
          <Form horizontal>
            <FormGroup>
              <Col sm={12}>
                <ControlLabel>User/Repo Name</ControlLabel>
                <FormControl type="text" name="searchTerm" value={searchTerm} onChange={this.handleChange} placeholder="Enter Github Repo/Username" />
              </Col>
            </FormGroup>
            <ControlLabel>Select Type</ControlLabel>
            <FormGroup>
              <Col sm={12}>
                <Radio name="radioGroup" checked={searchUsers} value="searchUsers" onChange={this.handleRadio} inline>
                  Search Users
                </Radio>
                <Radio name="radioGroup" checked={searchRepos} value="searchRepos" onChange={this.handleRadio} inline>
                  Search Repos
                </Radio>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={12}>
                <Button onClick={this.handleSearch}>
                  Search
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <Grid className="box-container">
          <Row className="show-grid">
            {
              repos.map((repo) => (
                <Col sm={3}>
                  <Link to={{ pathname: `/repo/${repo.name}`, state: { repo: repo } }}>
                    <div className="box-section">
                      <div className="title">{repo.name}</div>
                      <div className="box-image-container"><img className="box-image" src={repo.imageUrl} alt="logo" /></div>
                    </div>
                  </Link>
                </Col>
              ))
            }
          </Row>
          <Row className="show-grid">
            {
              users.map((user) => (
                <Col sm={3}>
                  <Link to={{ pathname: `/user/${user.name}`, state: { user: user } }}>
                    <div className="box-section">
                      <div className="title">{user.name}</div>
                      <div className="box-image-container"><img className="box-image" src={user.avatar} alt="logo" /></div>
                    </div>
                  </Link>
                </Col>
              ))
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSearchingRepos: state.searches.isSearchingRepos,
  isSearchingUsers: state.searches.isSearchingUsers,
  repos: state.searches.allRepos,
  users: state.searches.allUsers
});

const mapDispatchToProps = {
  searchGithubRepos,
  searchGithubUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
