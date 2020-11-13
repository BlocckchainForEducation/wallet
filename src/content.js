import storeCreatorFactory from "reduxed-chrome-storage";
import { createStore } from "redux";
import reducer, { requestSign } from "./views/Popup/redux";

console.log("Hello Content");

const storeCreator = storeCreatorFactory({ createStore });
let store;
const getStore = async () => {
  if (store) return store;
  store = await storeCreator(reducer);
  return store;
};

async function hdSignRequest(e) {
  const store = await getStore();
  if (e.source != window) return;
  if (e.data.type && e.data.type == "SIGN_REQUEST") {
    console.log("content.js: receive msg");
    store.dispatch(requestSign());
  }
}

window.addEventListener("message", hdSignRequest, false);
