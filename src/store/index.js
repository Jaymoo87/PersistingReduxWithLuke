import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import countReducer from "../features/countSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { apiStorage } from "./apiStorage";

const rootReducer = combineReducers({
  auth: authReducer,
  count: countReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: apiStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

/***
 * "REDUXY" SOLUTION
 * rootReducer returns the appReducer that retrieves the payload to hydrate state on loading
 * allows for database storage and retrieval instead of depending on local storage
 */

// const appReducer = combineReducers({
//   auth: authReducer,
//   count: countReducer,
// });

// const rootReducer = (state, action) => {
//   if (action.type === "hydrate") {
//     return appReducer(action.payload, action);
//   }
//   return appReducer(state, action);
// };

// const store = configureStore({
//   reducer: rootReducer,
// });

// store.subscribe(() => {
//   const state = store.getState();
//   fetch("/state", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(state),
//   })
//     .then((r) => r.json())
//     .then((res) => console.log(res));
// });

/*
 * HACKY SOLUTION
 */

// export const configureStoreAsync = () => {
//   return new Promise((resolve, reject) => {
//     fetch("/state")
//       .then((r) => r.json())
//       .then((preloadedState) => {
//         const options = {
//           reducer: rootReducer,
//         };
//         if (preloadedState) {
//           options.preloadedState = preloadedState;
//         }

//         store = configureStore(options);

//         resolve(store);
//       });
//   });
// };

// export const saveStateAsync = (state) => {
//   return new Promise((resolve, reject) => {
//     fetch("/state", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(state),
//     })
//       .then((r) => r.json())
//       .then((res) => resolve(res));
//   });
// };
