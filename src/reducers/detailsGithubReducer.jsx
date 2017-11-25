const initialState = {
  isLoadingRepoIssues: false,
  isLoadingUserRepos: false,
  isLoadingFilteredIssues: false,
  allIssues: [],
  allUserRepos: []
};

export default function detailsGithubReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_REPO_OPEN_ISSUES_REQUEST":
      return {
        ...state,
        isLoadingRepoIssues: true,
      }
    case "GET_REPO_OPEN_ISSUES_SUCCESS":
      return {
        ...state,
        isLoadingRepoIssues: false,
        allIssues: action.payload
      }
    case "GET_REPO_OPEN_ISSUES_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isLoadingRepoIssues: false,
      }
    case "GET_USER_REPOS_REQUEST":
      return {
        ...state,
        isLoadingUserRepos: true,
      }
    case "GET_USER_REPOS_SUCCESS":
      return {
        ...state,
        isLoadingUserRepos: false,
        allUserRepos: action.payload
      }
    case "GET_USER_REPOS_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isLoadingUserRepos: false
      }
    case "GET_FILTERED_ISSUES_REQUEST":
      return {
        ...state,
        isLoadingFilteredIssues: true,
      }
    case "GET_FILTERED_ISSUES_SUCCESS":
      return {
        ...state,
        isLoadingRepoIssues: false,
        allIssues: action.payload
      }
    case "GET_FILTERED_ISSUES_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isLoadingFilteredIssues: false
      }
    default:
      return state;
  }
}
