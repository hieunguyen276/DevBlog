import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    value: 'Set value',
  },
  // totalData: {
  //   totalUser: 0,
  //   totalBlog: 0,
  //   totalAuthor: 0,
  //   totalCategory: 0,
  // },
  reducers: {
    setValue: (state, action) => ({
      ...state,
      value: action.payload
    }),
    // setTotalData: (state, action) => ({
    //   ...state,
    //   value: action.payload
    // }),
  }
})

export const {
  setValue
} = homeSlice.actions

export default homeSlice.reducer;
