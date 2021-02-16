import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux";

export default configureStore({
  reducer: reducer,
});
