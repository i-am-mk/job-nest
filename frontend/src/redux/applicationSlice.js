import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    application: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setApplication: (state, action) => {
      state.application = action.payload;
    },
  },
});

export const { setLoading, setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
