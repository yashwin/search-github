import axios from 'axios';

export function getRepoLabels(url) {
  return (dispatch) => {
    dispatch(getRepoLabelsRequest());
    return axios.get(`${url}/labels`)
      .then((response) => {
        const allLabels = response.data;
        const allLabelsData = allLabels.map((label) => ({
          name: label.name
        }));
        dispatch(getRepoLabelsSuccess(allLabelsData));
      })
      .catch((error) => {
        dispatch(getRepoLabelsFailure(error));
        console.log(error);
      });
  };
}

function getRepoLabelsRequest() {
  return {
    type: "GET_REPO_LABELS_REQUEST",
    isLoadingRepoLabels: true,
  };
}

function getRepoLabelsSuccess(data) {
  return {
    type: "GET_REPO_LABELS_SUCCESS",
    isLoadingRepoLabels: false,
    payload: data
  };
}

function getRepoLabelsFailure(error) {
  return {
    type: "GET_REPO_LABELS_FAILURE",
    error,
    isLoadingRepoLabels: false
  };
}
