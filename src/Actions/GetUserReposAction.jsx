import axios from 'axios';

export function getUserRepos(url) {
  return (dispatch) => {
    dispatch(getUserReposRequest());
    return axios.get(`${url}`)
      .then((response) => {
        const allUserRepos = response.data;
        const allUserReposData = allUserRepos.map((repo) => ({
          title: repo.name
        }));
        dispatch(getUserReposSuccess(allUserReposData));
      })
      .catch((error) => {
        dispatch(getUserReposFailure(error));
        console.log(error);
      });
  };
}

function getUserReposRequest() {
  return {
    type: "GET_USER_REPOS_REQUEST",
    isLoadingUserRepos: true,
  };
}

function getUserReposSuccess(data) {
  return {
    type: "GET_USER_REPOS_SUCCESS",
    isLoadingUserRepos: false,
    payload: data
  };
}

function getUserReposFailure(error) {
  return {
    type: "GET_USER_REPOS_FAILURE",
    error,
    isLoadingUserRepos: false
  };
}
