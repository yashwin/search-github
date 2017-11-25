import axios from 'axios';

export function searchGithubUsers(searchTerm) {
  return (dispatch) => {
    dispatch(searchGithubUsersRequest());
    return axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((response) => {
        const allUsers = response.data.items
        const allUsersData = allUsers.map((user) => ({
          id: user.id,
          name: user.login,
          avatar: user.avatar_url,
          reposUrl: user.repos_url
        }));
        dispatch(searchGithubUsersSuccess(allUsersData));
      })
      .catch((error) => {
        dispatch(searchGithubUsersFailure(error));
        console.log(error);
      });
  };
}

function searchGithubUsersRequest() {
  return {
    type: "SEARCH_GITHUB_USERS_REQUEST",
    isSearchingUsers: true,
  };
}

function searchGithubUsersSuccess(data) {
  return {
    type: "SEARCH_GITHUB_USERS_SUCCESS",
    isSearchingUsers: false,
    payload: data
  };
}

function searchGithubUsersFailure(error) {
  return {
    type: "SEARCH_GITHUB_USERS_FAILURE",
    error,
    isSearchingUsers: false
  };
}
