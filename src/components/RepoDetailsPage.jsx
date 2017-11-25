import React from 'react';
import { FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getRepoOpenIssues } from '../Actions/GetRepoOpenIssuesAction';
import { getRepoLabels } from '../Actions/GetRepoLabelsAction';
import { getFilteredIssues } from '../Actions/GetFilteredIssuesAction';

class RepoDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: ""
    }
  }

  goBack = (e) => {
    this.props.history.goBack();
  };

  onSelectLabel = () => {
    var repoUrl = this.props.location.state.repo.url;
    var label = this.inputEl.value
    this.setState({ label: label });
    if(label === "all") {
      this.props.getRepoOpenIssues(repoUrl);
    }
    else {
      var fullName = this.props.location.state.repo.fullName;
      this.props.getFilteredIssues(label,fullName);
    }
  }

  componentWillMount() {
    var repoUrl = this.props.location.state.repo.url;
    this.props.getRepoOpenIssues(repoUrl);
    this.props.getRepoLabels(repoUrl);
  }

  render() {

    const { issues, labels } = this.props;
    const { repo } = this.props.location.state;

    return (
      <div>
        <FormGroup>
          <Col sm={6}>
            <div className="heading">List of issues for the Repo: {repo.name}</div>
          </Col>
          <Col className="filter-issues" sm={6}>
            <ControlLabel>Filter by label</ControlLabel>
            <FormControl componentClass="select" onChange={this.onSelectLabel.bind(this)}  inputRef={ el => this.inputEl=el } placeholder="select">
              <option value="all">All issues</option>
              {
                labels.map((label) => (
                  <option value={label.name}>{label.name}</option>
                ))
              }
            </FormControl>
          </Col>
        </FormGroup>
        <Col sm={12}>
          <ul className="lists">
          {
            issues.map((issue) => (
              <li>{issue.title}</li>
            ))
          }
          </ul>
        </Col>
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
  isLoadingRepoIssues: state.details.isLoadingRepoIssues,
  isLoadingRepoLabels: state.details.isLoadingRepoLabels,
  issues: state.details.allIssues,
  labels: state.labels.allLabels
});

const mapDispatchToProps = {
  getRepoOpenIssues,
  getRepoLabels,
  getFilteredIssues
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetailsPage);
