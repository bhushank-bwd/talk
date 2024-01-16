import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    contacts: [],
    cachedSearch: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    addCacheSearch: (state, action) => {
      state.cachedSearch = Object.assign(state, action.payload);
    },
  },
});
export const { addContact, addCacheSearch } = chatSlice.reducer;
export default chatSlice.reducer;
