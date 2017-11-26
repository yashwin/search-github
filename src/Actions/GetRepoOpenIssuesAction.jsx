import axios from 'axios';

export function getRepoOpenIssues(url) {
  return (dispatch) => {
    dispatch(getRepoOpenIssuesRequest());
    return axios.get(`${url}/issues`)
      .then((response) => {
        const allIssues = response.data;
        const allIssuesData = allIssues.map((issue) => ({
          id: issue.id,
          title: issue.title,
          username: issue.user.login
        }));
        dispatch(getRepoOpenIssuesSuccess(allIssuesData));
      })
      .catch((error) => {
        dispatch(getRepoOpenIssuesFailure(error));
        console.log(error);
      });
  };
}

function getRepoOpenIssuesRequest() {
  return {
    type: "GET_REPO_OPEN_ISSUES_REQUEST",
    isLoadingRepoIssues: true,
  };
}

function getRepoOpenIssuesSuccess(data) {
  return {
    type: "GET_REPO_OPEN_ISSUES_SUCCESS",
    isLoadingRepoIssues: false,
    payload: data
  };
}

function getRepoOpenIssuesFailure(error) {
  return {
    type: "GET_REPO_OPEN_ISSUES_FAILURE",
    error,
    isLoadingRepoIssues: false
  };
}
