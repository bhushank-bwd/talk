import { configureStore } from "@reduxjs/toolkit";
import siteSlice from "./siteSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    site: siteSlice,
    user: userSlice,
  },
});
export default store;
