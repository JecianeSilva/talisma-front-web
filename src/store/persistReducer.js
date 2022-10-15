import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "talisma",
      storage,
      whitelist: ["auth", "color"],
    },
    reducers
  );
  return persistedReducer;
};
