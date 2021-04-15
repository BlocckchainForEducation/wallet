import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";
const bip39 = require("bip39");
const HdKey = require("hdkey");
const { PrivateKey } = require("eciesjs");

// TODO: remove devmode
const devmodeMap = {
  BGD: "6cebf871e936d15b6540dc714dcff176839f73359d30ae49ae8ec1d44bd276db",
  BKHN: "6fd04410d4fe5cf4d67e2c3c5f1565aab576199bfc8c4011dc5b3054375d8953",
  KTQD: "6342c8682a84c9503c56294631fda268db12e084998cca5d0b5367bf47b14e3d",
  DHXD: "b77c57b097787b91faac4eb875fd6ab3a0e11257d7b722edfb010cd3cba42b2c",
  "GV Đỗ Bá Lâm": "1c84984dcaef77eb4e6b5e0d68662cc569118334a807e722e94b1e34cd21ca72",
  "GV Nguyễn Bình Minh": "7b1ec199c4827b0f46674fec95ba1a337f0042b285755ad5acdeeb64c0f8cf7d",
  "GV Đào Thành Chung": "1c2c728f6673a42630833f22790903275e79cf0702280018428d0f9e0a7584df",
  "SV Đỗ Hòa An": "dcbc581f8a1f73458eea31311ede5b16721628496f53ecf3c0e4cef4cbe02a4e",
  "SV Bùi Hải Anh": "1887157aeee14c71ab0b773912a83fbb9bba7c45c3c034135898e764b6599497",
  "SV Bùi Quang Anh": "8f30daa6af9de2b2fc5d8169dd5b55bed30501239a1117a11c638969bbaa7fcb",
};

const devmodeAccounts = Object.entries(devmodeMap).map((entry) => ({
  id: uid(),
  name: entry[0],
  privateKey: entry[1],
  publicKey: PrivateKey.fromHex(entry[1]).publicKey.toHex(true),
  avatarSeed: Math.round(Math.random() * 10000000),
}));

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    walletPassword: "",
    mnemonic: "",
    hdkey: null,
    accounts: [],
    importedAccounts: [],
    shouldAskPassword: false,
    isSignRequesting: false,
    accountToSign: null,
    tabId: null,
    showHidingAccount: false,
  },
  reducers: {
    setWalletPassword: (state, action) => {
      state.walletPassword = action.payload;
    },
    createNewWallet: (state, action) => {
      state.mnemonic = bip39.generateMnemonic();
      state.hdkey = HdKey.fromMasterSeed(bip39.mnemonicToSeedSync(state.mnemonic)).toJSON();
    },
    restoreWallet: (state, action) => {
      state.mnemonic = action.payload;
      state.hdkey = HdKey.fromMasterSeed(bip39.mnemonicToSeedSync(state.mnemonic)).toJSON();
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    createAccount: (state, action) => {
      const index = state.accounts.length;
      const path = "m/44'/0'/0'/0/" + index;
      const hdkeyObj = HdKey.fromJSON(state.hdkey);
      const newAccNode = hdkeyObj.derive(path);
      const newAcc = {
        id: uid(),
        name: "Tài khoản " + index,
        publicKey: newAccNode.publicKey.toString("hex"),
        privateKey: newAccNode.privateKey.toString("hex"),
        avatarSeed: Math.round(Math.random() * 10000000),
      };
      state.accounts.push(newAcc);
    },
    importAccount: (state, action) => {
      const privateKeyHex = action.payload;
      const publicKey = PrivateKey.fromHex(privateKeyHex).publicKey.toHex(true);
      const index = state.accounts.length;
      const newAcc = {
        id: uid(),
        name: "Tài khoản (Imported) " + index,
        publicKey: publicKey,
        privateKey: privateKeyHex,
        avatarSeed: Math.round(Math.random() * 10000000),
        isImported: true,
      };
      state.accounts.push(newAcc);
    },
    renameAccount: (state, action) => {
      const acc = state.accounts.find((acc) => acc.id === action.payload.id);
      acc.name = action.payload.name;
    },
    hideAccount: (state, action) => {
      const acc = state.accounts.find((acc) => acc.id === action.payload.id);
      acc.isHide = true;
    },
    unHideAccount: (state, action) => {
      const acc = state.accounts.find((acc) => acc.id === action.payload.id);
      acc.isHide = false;
    },
    toggleHidingAccountsVisible: (state) => {
      state.showHidingAccount = !state.showHidingAccount;
    },
    lockWallet: (state, action) => {
      state.shouldAskPassword = true;
    },
    unlockWallet: (state) => {
      state.shouldAskPassword = false;
    },
    requestSign: (state, action) => {
      state.isSignRequesting = true;
      state.tabId = action.payload;
    },
    setAccountToSign: (state, action) => {
      state.accountToSign = state.accounts.find((acc) => acc.id === action.payload.id);
      state.isSignRequesting = false;
    },
    refuseSign: (state, action) => {
      state.accountToSign = null;
      state.isSignRequesting = false;
      state.tabId = null;
    },
    turnOnDevmode: (state, action) => {
      state.accounts = devmodeAccounts;
    },
  },
});

export default popupSlice.reducer;
export const {
  setWalletPassword,
  createNewWallet,
  restoreWallet,
  createAccount,
  renameAccount,
  hideAccount,
  unHideAccount,
  toggleHidingAccountsVisible,
  lockWallet,
  unlockWallet,
  requestSign,
  setAccountToSign,
  refuseSign,
  importAccount,
  setAccounts,
  turnOnDevmode,
} = popupSlice.actions;
