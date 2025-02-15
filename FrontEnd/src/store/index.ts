import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import serverSideValidationReducer from "./slices/serverValidationError";
import  loaderReducer  from "./slices/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    serverValidationError: serverSideValidationReducer,
    loader: loaderReducer,
  },
});


  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;