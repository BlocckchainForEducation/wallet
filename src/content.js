import storeCreatorFactory from "reduxed-chrome-storage";
import { createStore } from "redux";
import reducer, { requestSign } from "./views/Popup/redux";

console.log("B4E Wallet is working...");

// init store
const storeCreator = storeCreatorFactory({ createStore });
let store;
const getStore = async () => {
  if (store) return store;
  store = await storeCreator(reducer);
  return store;
};

// receive sign request from web page, send it to ext
let checkpointRequestingState;
window.addEventListener("message", hdSignRequest, false);

async function hdSignRequest(e) {
  const store = await getStore();
  if (e.source !== window) return;
  if (e.data.type && e.data.type === "SIGN_REQUEST") {
    checkpointRequestingState = true;
    store.dispatch(requestSign(e.data.tabId));
  }
}

// receive res from ext, send it to web page
async function handleRequestResponse() {
  const store = await getStore();
  let nowRequestingState = store.getState().isSignRequesting;
  const tabId = store.getState().tabId;
  // accepted or refused
  if (checkpointRequestingState !== nowRequestingState) {
    let accountToSign = store.getState().accountToSign;
    window.postMessage({ type: "SIGN_RESPONSE", tabId, accept: Boolean(accountToSign), account: accountToSign });
  }
  checkpointRequestingState = nowRequestingState;
}
async function handleRes() {
  const store = await getStore();
  store.subscribe(handleRequestResponse);
}
handleRes();
