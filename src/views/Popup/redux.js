import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    walletPassword: "",
    mnemonic: "",
    accounts: [],
  },
  reducers: {
    setWalletPassword: (state, action) => {
      state.walletPassword = action.payload;
    },
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    // renameAccount: (state, action) => {

    // }
  },
});

export default popupSlice.reducer;
export const { setWalletPassword, setMnemonic, addAccount } = popupSlice.actions;
