import { all, takeLatest, put, call } from "redux-saga/effects";
import history from "../../config/history";
import Api from "../../config/api";
import { toast } from "react-toastify";
import { Types, Creators } from "../ducks/auth";

export function* signIn(payload) {
  console.log(payload);

  try {
    const response = yield call(Api.post, "/auth/login/", {
      email: payload.email,
      password: payload.password,
    });
    console.log(response);

    if (response.status === 201) {
      const { token } = "";

      Api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(Creators.signInSuccess(token));
      history.push("/home");
    } else {
      yield put(Creators.getToken());
      toast.error(response.data.message);
      yield put(Creators.signFailure());
    }
  } catch (error) {
    toast.error(error.response.data.message);
    const { token } = "";

    yield put(Creators.signInSuccess(token));
    // yield put(Creators.signFailure());
  }
}

export function signOut() {
  history.push("/");
}

export function* setToken({ payload }) {
  if (!payload) {
    return;
  }
  var { access_token } = payload.auth;

  if (access_token) {
    Api.defaults.headers.Authorization = `Bearer ${access_token}`;
  }
}
export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
]);
