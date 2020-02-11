import Axios from "axios";

export function userSignupRequest(userData) {
  return dispatch => {
    return Axios.post("/api/users", userData);
  };
}
