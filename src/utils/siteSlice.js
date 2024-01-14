import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "site",
  initialState: {
    name: "Talk",
  },
});
export default siteSlice.reducer;
