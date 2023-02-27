import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStoreAsync, saveStateAsync } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

configureStoreAsync().then((store) => {
  store.subscribe(() => {
    saveStateAsync(store.getState()).then((res) => console.log(res));
  });

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
