import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import languageSlice from "./slices/languageSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    languages : languageSlice
  },
});

export default store;
