// action constants
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// action creators
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("storyCraftUser"); // Remove user from local storage
  dispatch({ type: LOGOUT }); // Dispatch logout action
  window.location.reload();
};
