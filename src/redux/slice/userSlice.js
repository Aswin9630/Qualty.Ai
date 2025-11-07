import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    pendingCart: null,
    redirectAfterLogin: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },

    removeUser: (state, action) => {
      state.user = null;
    },

    setPendingCart: (state, action) => {
      state.pendingCart = action.payload;
    },
    clearPendingCart: (state) => {
      state.pendingCart = null;
    },
      setRedirectAfterLogin: (state, action) => {
      state.redirectAfterLogin = action.payload; 
    },
    clearRedirectAfterLogin: (state) => {
      state.redirectAfterLogin = null;
    },
  },
});

export const { addUser, removeUser,setPendingCart,clearPendingCart,setRedirectAfterLogin,clearRedirectAfterLogin } = userSlice.actions;
export default userSlice.reducer;
