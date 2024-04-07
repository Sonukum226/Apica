import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga, rootReducer } from "saga-slice";
import LruSlice from "./container/store/LruSlice";

const modules = [LruSlice];
const sagaMiddleware = createSagaMiddleware();
const appReducer = rootReducer(modules);
export const store = configureStore({
  reducer: {
    appReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga(modules));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
