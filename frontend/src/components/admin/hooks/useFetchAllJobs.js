import { JOB_API_ENDPOINT } from "@/utils";
import { setJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchAllJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    console.log("user.id", user.id);
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${JOB_API_ENDPOINT}/admins/${user.id}/jobs`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setJobs(response.data.jobs));
        } else {
          console.error("Failed to fetch jobs:", response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);
};

export default useFetchAllJobs;
