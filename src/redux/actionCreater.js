import axios from "axios";

export const auth = (email, password, login) => {
  return dispatch => {
    let data = {
      email,
      password,
      returnSecureToken: true
    };
    dispatch(authStart());
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhTB7X5oO6CBDV-NUkXNm674KQyIGu--M`;

    if (login) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhTB7X5oO6CBDV-NUkXNm674KQyIGu--M`;
    }

    axios
      .post(url, data)
      .then(res => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);

        let date = new Date();

        let finalTime = new Date(date.getTime() + res.data.expiresIn * 1000);
        localStorage.setItem("expiresIn", finalTime);
        console.log(finalTime + "," + res.data.expiresIn);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(autoLogout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail());
      });
  };
};

export const checkAuthenticatd = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    if (token) {
    }
  };
};

export let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresIn");
  return {
    type: "AUTH_LOGOUT"
  };
};

let autoLogout = expirataionTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirataionTime * 1000);
  };
};

export const authStart = () => {
  console.log("auth-start");
  return {
    type: "AUTH_START"
  };
};
export const authSuccess = (idToken, localId) => {
  console.log("auth-success");

  return {
    type: "AUTH_SUCCESS",
    payload: {
      idToken,
      localId
    }
  };
};

export const authFail = () => {
  return {
    type: "AUTH_FAIL"
  };
};

export const authCheckState = () => {
  return dispatch => {
    let token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      let expiresIn = new Date(localStorage.getItem("expiresIn"));
      if (expiresIn < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, localStorage.getItem("userId")));
        dispatch(autoLogout(expiresIn.getTime() - new Date().getTime() / 1000));
      }
    }
  };
};
