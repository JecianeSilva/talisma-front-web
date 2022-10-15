import { all, takeLatest, put, call } from "redux-saga/effects";
import history from "../../config/history";
import Api from "../../config/api";
import { toast } from "react-toastify";
import { Types, Creators } from "../ducks/auth";

export function* signIn(payload) {
  try {
    const response = yield call(Api.post, "/auth/login/", {
      email: payload.email,
      password: payload.password,
    });

    if (response.status === 201) {
      const { token, user } = response.data;
      Api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(Creators.signInSuccess(token, user));
      history.push("/home");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error.response.data.message
        : "Erro no sistema! Tente novamente mais tarde."
    );
    yield put(Creators.signFailure());
  }
}

export function signOut() {
  history.push("/");
}

export function* setToken({ payload }) {
  if (!payload) {
    return;
  }
  var { token } = payload.auth;

  if (token) {
    Api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
]);
