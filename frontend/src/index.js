import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { configureStore, persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
