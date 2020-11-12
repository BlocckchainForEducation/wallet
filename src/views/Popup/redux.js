import { createSlice } from "@reduxjs/toolkit";
import Jazzicon from "react-jazzicon";
import { uid } from "uid";

const bip39 = require("bip39");
const HdKey = require("hdkey");

const accountSchema = {
  id: "",
  name: "",
  publicKey: "",
  privateKey: "",
  avatar: "",
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
      state.hdkey = HdKey.fromMasterSeed(bip39.mnemonicToSeedSync(state.mnemonic));
    },
    restoreWallet: (state, action) => {
      state.mnemonic = action.payload;
      state.hdkey = HdKey.fromMasterSeed(bip39.mnemonicToSeedSync(state.mnemonic));
    },
    createAccount: (state, action) => {
      const index = state.accounts.length;
      const path = "m/44'/0'/0'/0/" + index;
      const newAccNode = state.hdkey.derive(path);
      const newAcc = {
        id: uid(),
        name: "Tài khoản " + index,
        publicKey: newAccNode.publicKey.toString("base64"),
        privateKey: newAccNode.privateKey.toString("base64"),
        avatar: <Jazzicon diameter={100} seed={Math.round(Math.random() * 10000000)} />,
      };
      state.accounts.push(newAcc);
    },
    renameAccount: (state, action) => {
      console.log("redux: id = " + action.payload.id);
      const acc = state.accounts.find((acc) => acc.id == action.payload.id);
      acc.name = action.payload.name;
    },
  },
});

export default popupSlice.reducer;
export const { setWalletPassword, createNewWallet, restoreWallet, createAccount, renameAccount } = popupSlice.actions;
