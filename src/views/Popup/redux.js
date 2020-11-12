import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const bip39 = require("bip39");
const HdKey = require("hdkey");

const accountSchema = {
  id: "",
  name: "",
  publicKey: "",
  privateKey: "",
  avatarSeed: "",
};

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    walletPassword: "",
    mnemonic: "",
    accounts: [],
    // hdkey: null,
    //create default wallet, just for dev:
    hdkey: HdKey.fromMasterSeed(bip39.mnemonicToSeedSync(bip39.generateMnemonic())),
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
    createAccount: (state, action) => {
      const index = state.accounts.length;
      const path = "m/44'/0'/0'/0/" + index;
      const hdkeyObj = HdKey.fromJSON(state.hdkey);
      const newAccNode = hdkeyObj.derive(path);
      const newAcc = {
        id: uid(),
        name: "Tài khoản " + index,
        publicKey: newAccNode.publicKey.toString("base64"),
        privateKey: newAccNode.privateKey.toString("base64"),
        avatarSeed: Math.round(Math.random() * 10000000),
      };
      state.accounts.push(newAcc);
    },
    renameAccount: (state, action) => {
      const acc = state.accounts.find((acc) => acc.id == action.payload.id);
      acc.name = action.payload.name;
    },
  },
});

export default popupSlice.reducer;
export const { setWalletPassword, createNewWallet, restoreWallet, createAccount, renameAccount } = popupSlice.actions;
