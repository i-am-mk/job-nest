import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/jobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setJobs(response.data.jobs));
        } else {
          console.error("Failed to fetch jobs:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
