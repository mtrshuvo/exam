export const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
          ...state,
        token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state, 
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
