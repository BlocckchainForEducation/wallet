import React from "react";
import ReactDOM from "react-dom";
import App from "./views/Popup/App";
import storeCreatorFactory from "reduxed-chrome-storage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./views/Popup/redux";
import webStore from "./views/Popup/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(
    <Provider store={webStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
} else if (process.env.NODE_ENV === "production") {
  (async () => {
    const extStore = await storeCreatorFactory({ createStore })(reducer);
    ReactDOM.render(
      <Provider store={extStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
      document.getElementById("root")
    );
  })();
}
