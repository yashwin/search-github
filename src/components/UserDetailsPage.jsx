import React from 'react';
import { FormGroup, Col,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUserRepos } from '../Actions/GetUserReposAction';

class UserDetailsPage extends React.Component {
  
  goBack = (e) => {
    this.props.history.goBack();
  };

  componentWillMount() {
    var repoUrl = this.props.location.state.user.reposUrl;
    this.props.getUserRepos(repoUrl);
  }

  render() {

    const { repos } = this.props;
    const { user } = this.props.location.state;

    return (
      <div>
        <div className="heading">List of Repos: {user.name}</div>
        <ul className="lists">
        {
          repos.map((repo) => (
            <li>{repo.title}</li>
          ))
        }
        </ul>
        <div className="go-back">
          <FormGroup>
            <Col sm={6}>
              <Button onClick={this.goBack}>
                Go Back
              </Button>
            </Col>
          </FormGroup>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoadingUserRepos: state.details.isLoadingUserRepos,
  repos: state.details.allUserRepos
});

const mapDispatchToProps = {
  getUserRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
