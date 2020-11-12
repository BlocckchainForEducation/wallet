import storeCreatorFactory from "reduxed-chrome-storage";
import { createStore } from "redux";
import reducer from "./views/Popup/redux";
console.log("Hello Background");

(async () => {
  const store = await storeCreatorFactory({ createStore })(reducer);
  console.log(store);
})();
