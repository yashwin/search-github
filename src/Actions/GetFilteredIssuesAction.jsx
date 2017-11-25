import axios from 'axios';

export function getFilteredIssues(label,repo) {
  return (dispatch) => {
    dispatch(getFilteredIssuesRequest());
    return axios.get(`https://api.github.com/search/issues?q=is:issue%20label:${label}%20repo:${repo}`)
      .then((response) => {
        const allFileredIssues = response.data.items;
        const allFileredIssuesData = allFileredIssues.map((issue) => ({
          title: issue.title,
          username: issue.user.login
        }));
        dispatch(getFilteredIssuesSuccess(allFileredIssuesData));
      })
      .catch((error) => {
        dispatch(getFilteredIssuesFailure(error));
        console.log(error);
      });
  };
}

function getFilteredIssuesRequest() {
  return {
    type: "GET_FILTERED_ISSUES_REQUEST",
    isLoadingFilteredIssues: true,
  };
}

function getFilteredIssuesSuccess(data) {
  return {
    type: "GET_FILTERED_ISSUES_SUCCESS",
    isLoadingFilteredIssues: false,
    payload: data
  };
}

function getFilteredIssuesFailure(error) {
  return {
    type: "GET_FILTERED_ISSUES_FAILURE",
    error,
    isLoadingFilteredIssues: false
  };
}
