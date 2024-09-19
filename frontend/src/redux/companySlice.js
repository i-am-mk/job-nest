import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    companies: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setLoading, setCompanies } = companySlice.actions;
export default companySlice.reducer;
