import { configureStore } from "@reduxjs/toolkit";
import { chatApi } from "../api/chatApi";
import mainReducer from "./reducer.slice";

export const setupStore = () => {
  return configureStore({
    reducer: { main: mainReducer, [chatApi.reducerPath]: chatApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(chatApi.middleware),
    devTools: true,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
