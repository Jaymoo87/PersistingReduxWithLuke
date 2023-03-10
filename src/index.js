import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";

import store, { persistor } from "./store";

import { PersistGate } from "redux-persist/es/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading....</h1>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

/**
 * HACKY SOLUTION IMPORTS AND ASYNC WRAPPER
 */

// import { configureStoreAsync, saveStateAsync } from "./store";

// configureStoreAsync().then((store) => {
//   store.subscribe(() => {
//     saveStateAsync(store.getState()).then((res) => console.log(res));
//   });

// });
