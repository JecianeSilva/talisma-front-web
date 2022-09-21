import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  signInRequest: ["email", "password"],
  signInSuccess: ["access_token"],
  signFailure: [],
  setToken: ["access_token"],
  signOut: [],
});

const INITIAL_STATE = {
  access_token: null,
  signed: false,
  loading: false,
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
    access_token: action.access_token,
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
    access_token: action.access_token,
    loading: false,
  };
};

const signOut = (state = INITIAL_STATE) => {
  return {
    ...state,
    access_token: null,
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
