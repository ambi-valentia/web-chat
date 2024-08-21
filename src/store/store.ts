import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from './reducer.slice';
import creareSagaMiddlware from "redux-saga";

const sagaMiddleware = creareSagaMiddlware();

const rootReducer = combineReducers({
  mainReducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {},
      }).concat(sagaMiddleware),
    devTools: true,
  });

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSote = ReturnType<typeof setupStore>;
export type AppDispatch = AppSote["dispatch"];
