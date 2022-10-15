import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  signInRequest: ["email", "password"],
  signInSuccess: ["token",'user'],
  signFailure: [],
  setToken: ["token"],
  signOut: [],
});

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  user: null,
};

const signInRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
  };
};

const signInSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    signed: true,
    loading: false,
  };
};

const signFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false,
  };
};
const setToken = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    token: action.token,
    loading: false,
  };
};

const signOut = (state = INITIAL_STATE) => {
  return {
    ...state,
    token: null,
    signed: false,
    loading: false,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_FAILURE]: signFailure,
  [Types.SIGN_OUT]: signOut,
  [Types.SET_TOKEN]: setToken,
});
