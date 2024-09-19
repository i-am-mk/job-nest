import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    job: [],
    jobs: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { setLoading, setJob, setJobs } = jobSlice.actions;
export default jobSlice.reducer;
