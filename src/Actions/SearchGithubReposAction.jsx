import axios from 'axios';

export function searchGithubRepos(searchTerm) {
  return (dispatch) => {
    dispatch(searchGithubReposRequest());
    return axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
      .then((response) => {
        const allRepos = response.data.items
        const allReposData = allRepos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          imageUrl: repo.owner.avatar_url,
          url: repo.url
        }));
        dispatch(searchGithubReposSuccess(allReposData));
      })
      .catch((error) => {
        dispatch(searchGithubReposFailure(error));
        console.log(error);
      });
  };
}

function searchGithubReposRequest() {
  return {
    type: "SEARCH_GITHUB_REPOS_REQUEST",
    isSearchingRepos: true,
  };
}

function searchGithubReposSuccess(data) {
  return {
    type: "SEARCH_GITHUB_REPOS_SUCCESS",
    isSearchingRepos: false,
    payload: data
  };
}

function searchGithubReposFailure(error) {
  return {
    type: "SEARCH_GITHUB_REPOS_FAILURE",
    error,
    isSearchingRepo: false
  };
}
