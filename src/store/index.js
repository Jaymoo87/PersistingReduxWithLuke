import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import countReducer from "../features/countSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  count: countReducer,
});

let store = null;

export const configureStoreAsync = () => {
  return new Promise((resolve, reject) => {
    fetch("/state")
      .then((r) => r.json())
      .then((preloadedState) => {
        const options = {
          reducer: rootReducer,
        };
        if (preloadedState) {
          options.preloadedState = preloadedState;
        }

        store = configureStore(options);

        resolve(store);
      });
  });
};

export const saveStateAsync = (state) => {
  return new Promise((resolve, reject) => {
    fetch("/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((r) => r.json())
      .then((res) => resolve(res));
  });
};

export default store;
