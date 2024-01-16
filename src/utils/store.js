import { configureStore } from "@reduxjs/toolkit";
import siteSlice from "./siteSlice";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    site: siteSlice,
    user: userSlice,
    chat: chatSlice,
  },
});
export default store;
