import { all, takeLatest, put, call } from "redux-saga/effects";
import history from "../../config/history";
import api from "../../config/api";
import { toast } from "react-toastify";
import { Types, Creators } from "../ducks/auth";

export function* signIn(payload) {
  try {
    console.log(payload);
    // const response = yield call(api.post, '/user/web-login', {
    //     email: payload.email,
    //     password: payload.password,
    // })

    // if (response.status === 200) {
    // const { accessToken, User } = response.data
    const accessToken = "";

    // api.defaults.headers.Authorization = `Bearer ${accessToken}`

    yield put(Creators.signInSuccess(accessToken));
    history.push("/home");
    // } else {
    //     yield put(Creators.getToken())
    //     toast.error(response.data.message)
    //     yield put(Creators.signFailure())
    // }
  } catch (error) {
    toast.error(error.response.data.message);
    yield put(Creators.signFailure());
  }
}

export function signOut() {
  history.push("/");
}

export function* setToken2({ payload }) {
  if (!payload) {
    return;
  }
  var { access_token } = payload.auth;

  if (access_token) {
    api.defaults.headers.Authorization = `Bearer ${access_token}`;
  }
}
export default all([
  takeLatest("persist/REHYDRATE", setToken2),
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
]);
