import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const bip39 = require("bip39");
const HdKey = require("hdkey");
const secp256k1 = require("secp256k1");

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
    origin: null,
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
      const privateKeyBuf = Buffer.from(privateKeyHex, "hex");
      const publicKey = Buffer.from(secp256k1.publicKeyCreate(privateKeyBuf, true)).toString("hex");
      const index = state.accounts.length;
      const newAcc = {
        id: uid(),
        name: "Tài khoản (Imported) " + index,
        publicKey: publicKey,
        privateKey: privateKeyHex,
        avatarSeed: Math.round(Math.random() * 10000000),
      };
      state.accounts.push(newAcc);
    },
    renameAccount: (state, action) => {
      const acc = state.accounts.find((acc) => acc.id === action.payload.id);
      acc.name = action.payload.name;
    },
    lockWallet: (state, action) => {
      state.shouldAskPassword = true;
    },
    unlockWallet: (state) => {
      state.shouldAskPassword = false;
    },
    requestSign: (state, action) => {
      state.isSignRequesting = true;
      state.origin = action.payload;
    },
    setAccountToSign: (state, action) => {
      state.accountToSign = state.accounts.find((acc) => acc.id === action.payload.id);
      state.isSignRequesting = false;
    },
    refuseSign: (state, action) => {
      state.accountToSign = null;
      state.isSignRequesting = false;
      state.origin = null;
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
  lockWallet,
  unlockWallet,
  requestSign,
  setAccountToSign,
  refuseSign,
  importAccount,
  setAccounts,
} = popupSlice.actions;
