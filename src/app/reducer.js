import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    Blog:{
     getby:"Home",
     getbyId:null,
    },
    LoginUser:{}
  },
  reducers: {
    setLoginUsersData: (state, action) => {
      console.log(action)
        state.LoginUser = action.payload;
    },
  },
});
export const {setLoginUsersData } = appSlice.actions;
export default appSlice.reducer;
