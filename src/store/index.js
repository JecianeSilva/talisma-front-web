import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import createStore from "./createStore";
import persistReducers from "./persistReducer";

import reducers from "./ducks";
import sagas from "./sagas";

import { reactotronRedux } from "reactotron-redux";

const sagaMonitor = reactotronRedux.createSagaMonitor;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(persistReducers(reducers), [sagaMiddleware]);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
