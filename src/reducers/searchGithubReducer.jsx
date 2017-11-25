const initialState = {
  isSearchingRepos: false,
  isSearchingUsers: false,
  allRepos: [],
  allUsers: []
};

export default function searchGithubReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_GITHUB_REPOS_REQUEST":
      return {
        ...state,
        isSearchingRepos: true,
      }
    case "SEARCH_GITHUB_REPOS_SUCCESS":
      return {
        ...state,
        isSearchingRepos: false,
        allRepos: action.payload,
        allUsers: []
      }
    case "SEARCH_GITHUB_REPOS_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isSearchingRepos: false,
      }
    case "SEARCH_GITHUB_USERS_REQUEST":
      return {
        ...state,
        isSearchingUsers: true,
      }
    case "SEARCH_GITHUB_USERS_SUCCESS":
      return {
        ...state,
        isSearchingUsers: false,
        allUsers: action.payload,
        allRepos: []
      }
    case "SEARCH_GITHUB_USERS_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isSearchingUsers: false,
      }
    default:
      return state;
  }
}
