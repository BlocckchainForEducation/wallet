import storeCreatorFactory from "reduxed-chrome-storage";
import { createStore } from "redux";
import reducer, { lockWallet } from "./views/Popup/redux";

const storeCreator = storeCreatorFactory({ createStore });
let store;
const getStore = async () => {
  if (store) return store;
  store = await storeCreator(reducer);
  return store;
};

// (async () => {
//   const store = await getStore();
//   console.log(store);
// })();

chrome.windows.onRemoved.addListener(async function (windowid) {
  const store = await getStore();
  store.dispatch(lockWallet());
});
