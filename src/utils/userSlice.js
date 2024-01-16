import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    addFireStoreUserDocId: (state, action) => {
      state.docId = action.payload;
    },
  },
});
export const { addUser, removeUser, addFireStoreUserDocId } = userSlice.actions;
export default userSlice.reducer;
