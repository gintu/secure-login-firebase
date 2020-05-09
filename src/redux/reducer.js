const initialState = {
  token: null,
  userId: null,
  loading: null
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        token: action.payload.idToken,
        userId: action.payload.localId
      };
    case "AUTH_FAIL":
      return {
        ...state,
        loading: false
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        token: null,
        userId: null
      };

    default:
      return state;
  }
};

export default reducer;
