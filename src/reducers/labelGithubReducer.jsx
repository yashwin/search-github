const initialState = {
  isLoadingRepoLabels: false,
  allLabels: []
};

export default function labelGithubReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_REPO_LABELS_REQUEST":
      return {
        ...state,
        isLoadingRepoLabels: true,
      }
    case "GET_REPO_LABELS_SUCCESS":
      return {
        ...state,
        isLoadingRepoLabels: false,
        allLabels: action.payload
      }
    case "GET_REPO_LABELS_FAILURE":
      console.log("error occured", action.error)
      return {
        ...state,
        isLoadingRepoLabels: false,
      }
    default:
      return state;
  }
}
